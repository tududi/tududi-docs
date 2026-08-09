---
sidebar_position: 5
title: SSO / OIDC
description: Configure single sign-on with Google, Okta, Keycloak, Authentik, Azure AD, Kanidm, or any OIDC provider.
---
# SSO / OIDC

OpenID Connect lets people sign in to tududi using an external identity provider instead of (or alongside) an email and password.

**What you get:**
- **Single sign-on** with existing corporate or personal accounts
- **Just-in-time provisioning** — new users created automatically on first login
- **Account linking** — connect several login methods to one account
- **Hybrid authentication** — password and SSO can coexist, or you can enforce SSO only
- **Multiple providers** at the same time

---
## Supported Providers

tududi works with any OIDC-compliant provider that publishes a `.well-known/openid-configuration` document.

| Provider | Type | Typical use |
|----------|------|-------------|
| Google | Public | Personal accounts, Google Workspace |
| Okta | Enterprise | Corporate SSO |
| Keycloak | Self-hosted | Open-source identity management |
| Authentik | Self-hosted | Homelab, small business |
| PocketID | Public | Decentralized identity |
| Azure AD | Enterprise | Microsoft 365 organizations |
| Kanidm | Self-hosted | Homelab, corporate SSO |
| Generic OIDC | Any | Custom providers |

---
## Configuration

OIDC is configured with environment variables. **Restart tududi after any change.**

### Single provider

```bash
# Enable OIDC
OIDC_ENABLED=true

# Provider configuration
OIDC_PROVIDER_NAME=Google
OIDC_PROVIDER_SLUG=google
OIDC_ISSUER_URL=https://accounts.google.com
OIDC_CLIENT_ID=your-client-id.apps.googleusercontent.com
OIDC_CLIENT_SECRET=your-client-secret
OIDC_SCOPE=openid profile email

# Auto-provisioning (recommended)
OIDC_AUTO_PROVISION=true

# Optional: grant admin to specific email domains
OIDC_ADMIN_EMAIL_DOMAINS=example.com,mycompany.com

# Required for OAuth callbacks to resolve correctly
BASE_URL=https://tududi.example.com
```

### Multiple providers

Use numbered variables. Start at `1` and increment with no gaps.

```bash
OIDC_ENABLED=true

# Provider 1: Google
OIDC_PROVIDER_1_NAME=Google
OIDC_PROVIDER_1_SLUG=google
OIDC_PROVIDER_1_ISSUER=https://accounts.google.com
OIDC_PROVIDER_1_CLIENT_ID=xxx.apps.googleusercontent.com
OIDC_PROVIDER_1_CLIENT_SECRET=xxx
OIDC_PROVIDER_1_SCOPE=openid profile email
OIDC_PROVIDER_1_AUTO_PROVISION=true

# Provider 2: Company Okta
OIDC_PROVIDER_2_NAME=Company SSO
OIDC_PROVIDER_2_SLUG=okta
OIDC_PROVIDER_2_ISSUER=https://company.okta.com
OIDC_PROVIDER_2_CLIENT_ID=yyy
OIDC_PROVIDER_2_CLIENT_SECRET=yyy
OIDC_PROVIDER_2_AUTO_PROVISION=true
OIDC_PROVIDER_2_ADMIN_EMAIL_DOMAINS=company.com
```

### Variable reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OIDC_ENABLED` | Yes | `false` | Enable the OIDC feature |
| `OIDC_PROVIDER_NAME` | Yes | — | Display name shown on the login button |
| `OIDC_PROVIDER_SLUG` | Yes | — | URL-safe identifier used in callback URLs |
| `OIDC_ISSUER_URL` | Yes | — | OIDC discovery endpoint |
| `OIDC_CLIENT_ID` | Yes | — | OAuth client ID |
| `OIDC_CLIENT_SECRET` | Yes | — | OAuth client secret |
| `OIDC_SCOPE` | No | `openid profile email` | Space-separated OAuth scopes |
| `OIDC_AUTO_PROVISION` | No | `true` | Create users automatically on first login |
| `OIDC_ADMIN_EMAIL_DOMAINS` | No | — | Comma-separated domains that get admin on provisioning |
| `PASSWORD_AUTH_ENABLED` | No | `true` | Set `false` to enforce SSO-only |
| `BASE_URL` | Yes | — | Public base URL, used to build OAuth callbacks |

**Scope formatting.** Use plain spaces — tududi trims, collapses repeated spaces, ensures `openid` is present, and URL-encodes the value itself. Do not pre-encode with `%20` or `+`.

:::warning Behind a reverse proxy? Set TUDUDI_TRUST_PROXY
If tududi runs behind nginx, Traefik, Apache, or similar, you **must** set `TUDUDI_TRUST_PROXY=true`. Without it, sessions are lost immediately after SSO login (you get bounced back to the login screen with 401s), rate limiting keys off the proxy IP, and audit logs record the wrong address.
:::

---
## Callback URLs

Every provider needs a redirect URI registered on its side. The format is always:

```
{BASE_URL}/api/oidc/callback/{slug}
```

For example, with `BASE_URL=https://tududi.example.com` and `OIDC_PROVIDER_SLUG=google`:

```
https://tududi.example.com/api/oidc/callback/google
```

It must match **exactly**, including the scheme.

---
## Provider Setup Guides

### Google

1. In the [Google Cloud Console](https://console.cloud.google.com/), go to **APIs & Services → Credentials**
2. **Create Credentials → OAuth client ID → Web application**
3. Add authorized redirect URIs:
   - Development: `http://localhost:3002/api/oidc/callback/google`
   - Production: `https://your-domain.com/api/oidc/callback/google`
4. Copy the client ID and secret

```bash
OIDC_ENABLED=true
OIDC_PROVIDER_NAME=Google
OIDC_PROVIDER_SLUG=google
OIDC_ISSUER_URL=https://accounts.google.com
OIDC_CLIENT_ID=123456789.apps.googleusercontent.com
OIDC_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
OIDC_SCOPE=openid profile email
OIDC_AUTO_PROVISION=true
```

### Okta

1. In the Okta admin console: **Applications → Create App Integration**
2. Choose **OIDC - OpenID Connect** → **Web Application**
3. Set the sign-in redirect URI to `https://your-domain.com/api/oidc/callback/okta`
4. Set the sign-out redirect URI to `https://your-domain.com/login`
5. Save and note the client ID and secret

Issuer URL format: `https://{your-domain}.okta.com`

```bash
OIDC_PROVIDER_NAME=Company SSO
OIDC_PROVIDER_SLUG=okta
OIDC_ISSUER_URL=https://company.okta.com
OIDC_ADMIN_EMAIL_DOMAINS=company.com
```

### Keycloak

1. Select your realm → **Clients → Create client**
2. Client type **OpenID Connect**, client ID `tududi`
3. Turn **Client authentication** ON (confidential)
4. Valid redirect URI: `https://your-domain.com/api/oidc/callback/keycloak`
5. Copy the secret from the **Credentials** tab

Issuer URL format: `https://{keycloak-domain}/realms/{realm-name}`

```bash
OIDC_PROVIDER_NAME=Keycloak
OIDC_PROVIDER_SLUG=keycloak
OIDC_ISSUER_URL=https://auth.example.com/realms/myrealm
OIDC_CLIENT_ID=tududi
```

### Authentik

1. **Applications → Create with Provider**
2. Name the application `Tududi`; note the slug (it defaults to the lowercased name)
3. Choose **OAuth2/OpenID Provider**, note the client ID and secret
4. Add a **Strict** redirect URI: `https://your-domain.com/api/oidc/callback/{application-slug}`
5. Select a signing key, then submit

Find the issuer under **Applications → Providers → your provider → OpenID Configuration Issuer**. It has the form `https://{authentik-domain}/application/o/{application-slug}/`.

```bash
OIDC_PROVIDER_NAME=Authentik
OIDC_PROVIDER_SLUG={application-slug}
OIDC_ISSUER_URL=https://{authentik-domain}/application/o/{application-slug}/
```

### PocketID

1. Create a new application in the PocketID developer console
2. Redirect URI: `https://your-domain.com/api/oidc/callback/pocketid`

```bash
OIDC_PROVIDER_NAME=PocketID
OIDC_PROVIDER_SLUG=pocketid
OIDC_ISSUER_URL=https://pocketid.app
```

### Azure AD

1. **Azure Active Directory → App registrations → New registration**
2. Redirect URI (Web): `https://your-domain.com/api/oidc/callback/azure`
3. Create a client secret under **Certificates & secrets**
4. Note the application (client) ID and your tenant ID

```bash
OIDC_PROVIDER_NAME=Microsoft
OIDC_PROVIDER_SLUG=azure
OIDC_ISSUER_URL=https://login.microsoftonline.com/{tenant-id}/v2.0
OIDC_CLIENT_ID=12345678-1234-1234-1234-123456789012
```

### Kanidm

Using the Kanidm CLI:

```bash
# 1. Create the application
kanidm system oauth2 create tududi_app Tududi https://tududi.domain.tld

# 2. Get the client secret
kanidm system oauth2 show-basic-secret tududi_app

# 3. tududi does not support PKCE
kanidm system oauth2 warning-insecure-client-disable-pkce tududi_app

# 4. tududi supports RS256, not ES256
kanidm system oauth2 warning-enable-legacy-crypto tududi_app

# 5. Register the redirect URL
kanidm system oauth2 add-redirect-url tududi_app \
  https://tududi.domain.tld/api/oidc/callback/tududi_app

# 6. Map scopes to a group (idm_all_persons grants access to everyone)
kanidm system oauth2 update-scope-map tududi_app idm_all_persons openid profile email
```

```bash
OIDC_PROVIDER_NAME=Kanidm
OIDC_PROVIDER_SLUG=tududi_app
OIDC_ISSUER_URL=https://kanidm.domain.tld/oauth2/openid/tududi_app/
OIDC_CLIENT_ID=tududi_app
```

---
## Signing In

**First time:** click the provider button on the login page, approve the permissions at the provider, and you are returned to tududi signed in. If auto-provisioning is on, an account is created for you.

**Returning:** click the provider button. If you already have a session with the provider you are signed in immediately.

---
## Linking and Unlinking Accounts

Users with an existing email/password account can add SSO to it:

1. Sign in with email and password
2. Go to **Profile → OIDC/SSO**
3. Under **Connected Accounts**, click **Link** next to the provider
4. Approve the permissions

You can then sign in either way. The same screen shows each linked provider, the email from that provider, and when it was first linked and last used. **Unlink** removes a connection.

:::note You cannot remove your last login method
tududi blocks unlinking if it would leave you with no way in. You must have either a password set or at least one linked OIDC identity. Set a password first (**Profile → Security**), then unlink.
:::

---
## Auto-Provisioning

With `OIDC_AUTO_PROVISION=true` (the default), a first-time SSO user is handled like this:

1. tududi looks for an existing OIDC identity for that provider and subject
2. If none exists, it looks for a user with the same email:
   - **Found** — the OIDC identity is linked to that existing user
   - **Not found** — a new user is created with the verified email from the provider's claims, a username derived from the email prefix, no password, and admin if the domain matches `OIDC_ADMIN_EMAIL_DOMAINS`
3. The user is signed in

Set `OIDC_AUTO_PROVISION=false` for invite-only deployments. Only users with a pre-linked identity can then sign in; everyone else is rejected.

### Admin by email domain

```bash
OIDC_ADMIN_EMAIL_DOMAINS=company.com,example.org
```

- Applies **only at first provisioning**, never on later logins
- Existing non-admin users are never promoted this way
- Domain matching is case-insensitive

---
## Hybrid and SSO-Only Modes

Three arrangements are possible: password only, SSO only, or both.

If a user was created via SSO and has no password, attempting a password login tells them to use their SSO provider instead.

### Enforcing SSO only

```bash
PASSWORD_AUTH_ENABLED=false
OIDC_ENABLED=true
# ... provider settings
```

With password auth disabled:
- The login page hides the password form and the registration link, showing only provider buttons
- `/register` shows a "Password Registration Disabled" message; direct attempts return 403
- `POST /api/login` and `POST /api/register` return 403
- `GET /api/password-auth-status` returns `{ "enabled": false }`

:::danger Verify admin access before disabling passwords
Make sure at least one admin can sign in via SSO **before** setting `PASSWORD_AUTH_ENABLED=false`, and that `OIDC_AUTO_PROVISION=true` if new users still need to register. Existing password users lose their login until they link an identity.
:::

**Migration path:** configure OIDC → ask users to link their accounts → verify everyone has an identity → set `PASSWORD_AUTH_ENABLED=false` → restart → watch the logs.

**Rollback:** set `PASSWORD_AUTH_ENABLED=true` (or remove the variable) and restart. Password login works again immediately.

To disable OIDC entirely, set `OIDC_ENABLED=false` and restart; password authentication continues to work.

---
## Troubleshooting

### Signed in, then immediately bounced back to login (401s)

The most common OIDC problem. Express is not trusting your reverse proxy, so the session cookie is never set properly.

```bash
TUDUDI_TRUST_PROXY=true
```

Restart. The log should stop showing `ValidationError: The 'X-Forwarded-For' header is set but the Express 'trust proxy' setting is false`.

### "Provider not found"

The slug in the URL matches no configured provider. Check `OIDC_PROVIDER_SLUG` (lowercase, URL-safe, no spaces) and restart after editing.

### "Invalid state parameter"

The OAuth state check failed — the state expired (older than 10 minutes), was already used, or the callback URL does not match. Start the login flow fresh rather than reusing an old URL, and confirm `BASE_URL` matches your real domain.

### "Auto-provisioning disabled"

The user does not exist and `OIDC_AUTO_PROVISION=false`. Either enable it or create the account manually and link the identity.

### Provider button missing

Check `OIDC_ENABLED=true`, that every required variable is present and spelled correctly, and restart. The browser console will show errors from `GET /api/oidc/providers`.

### "Invalid grant" or token errors

JWT validation failed. Verify the client secret, confirm `OIDC_ISSUER_URL` exactly matches the provider's `iss` claim, and check that server clocks are NTP-synced.

### Callback URL mismatch

The redirect URI registered at the provider must match `{BASE_URL}/api/oidc/callback/{slug}` character for character, including `http` vs `https`.

---
## Security

**Secrets.** Client secrets live in your `.env` file in plaintext. Keep it out of version control, set `chmod 600 .env`, and prefer Docker or Kubernetes secrets in production.

**OAuth flow.** tududi implements CSRF protection with a 32-byte random state parameter, one-time state with a 10-minute TTL, ID token verification against the provider's JWKS, and nonce validation.

**What is stored:** the provider's subject ID, the email, name, and picture from the claims, the raw claims for debugging, and first/last login timestamps.

**What is not stored:** provider passwords, access tokens (discarded after login), and refresh tokens.

**Audit trail.** Authentication events — login success and failure, identity linking and unlinking, provider, IP address, and user agent — are recorded in the auth audit log.

**Rate limiting.** `/api/oidc/auth/*` and `/api/oidc/callback/*` allow 5 requests per 15 minutes per IP. See [API Security](/features/api-security).

**Practices worth following:** use HTTPS, whitelist only the exact callback URLs you need, rotate client secrets periodically, enable only providers you trust, and request the minimum scopes.

---
## API Reference

```bash
# List configured providers
GET /api/oidc/providers

# Start a login flow (redirect the browser here)
GET /api/oidc/auth/{slug}

# The provider returns the user here
GET /api/oidc/callback/{slug}

# The signed-in user's linked identities
GET /api/oidc/identities

# Link / unlink
POST   /api/oidc/link/{slug}
DELETE /api/oidc/unlink/{identityId}
```

`GET /api/oidc/providers` responds with:

```json
[
  {
    "slug": "google",
    "name": "Google",
    "button_text": "Sign in with {name}",
    "type": "oidc"
  }
]
```

---
## Related Documentation

- [User Management](/features/user-management) - Roles, registration, and profiles
- [Configuration](configuration.md) - Full environment variable reference
- [API Security](/features/api-security) - Rate limits and token authentication

**Technical Implementation Files:**
- OIDC module: `/backend/modules/oidc/` (routes, controller, service)
- Auth config: `/backend/config/authConfig.js`
- Identity models: `/backend/models/oidc_identity.js`, `/backend/models/auth_audit_log.js`
- Settings UI: `/frontend/components/Profile/tabs/OIDCTab.tsx`
- Login buttons: `/frontend/components/Auth/OIDCProviderButtons.tsx`
- Callback handler: `/frontend/components/Auth/OIDCCallback.tsx`
