# SAAJ Virtual — Cal.com Appointment Embeds

This document contains the Cal.com inline embed configurations used by the SAAJ Virtual platform.

Appointments are currently available only for:

- **Maxixe**
- **Massinga**

Users outside Maxixe and Massinga are routed to the **Geral** experience and should not be shown appointment functionality.

---

## 1. Routing Logic

| Location | Appointments | Cal.com Embed |
|---|---:|---|
| Maxixe | Yes | SAAJ Maxixe |
| Massinga | Yes | SAAJ Massinga |
| Other districts in Inhambane | No | None |
| Other provinces | No | None |

### Application logic

```text
Province: Inhambane
        │
        ├── District: Maxixe
        │       → Use MAXIXE Cal.com embed
        │
        ├── District: Massinga
        │       → Use MASSINGA Cal.com embed
        │
        └── Other district
                → No appointment embed

Any other province
        → No appointment embed
```

---

# 2. Maxixe — Cal.com Embed

## Location

**Province:** Inhambane  
**District/City:** Maxixe

## Cal.com Link

```text
saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta
```

## Configuration

- Layout: `month_view`
- Small-screen slots view: Enabled
- Event type details: Hidden
- Query parameter forwarding: Enabled
- Embed type: Inline

## Embed Code

```html
<!-- Cal inline embed code begins -->

<div
  style="width:100%;height:100%;overflow:scroll"
  id="my-cal-inline-saaj-virtual-marcacao-de-consulta">
</div>

<script type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };

    let d = C.document;

    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;

      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }

      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };

        const namespace = ar[1];

        api.q = api.q || [];

        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }

        return;
      }

      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", "saaj-virtual-marcacao-de-consulta", {
    origin: "https://app.cal.com"
  });

  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;

  Cal.ns["saaj-virtual-marcacao-de-consulta"]("inline", {
    elementOrSelector:
      "#my-cal-inline-saaj-virtual-marcacao-de-consulta",

    config: {
      layout: "month_view",
      useSlotsViewOnSmallScreen: "true"
    },

    calLink:
      "saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta"
  });

  Cal.ns["saaj-virtual-marcacao-de-consulta"]("ui", {
    hideEventTypeDetails: true,
    layout: "month_view"
  });
</script>

<!-- Cal inline embed code ends -->
```

---

# 3. Massinga — Cal.com Embed

## Location

**Province:** Inhambane  
**District:** Massinga

## Cal.com Link

```text
saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta
```

## Configuration

- Layout: `month_view`
- Small-screen slots view: Enabled
- Event type details: Hidden
- Query parameter forwarding: Enabled
- Embed type: Inline

## Embed Code

```html
<!-- Cal inline embed code begins -->

<div
  style="width:100%;height:100%;overflow:scroll"
  id="my-cal-inline-saaj-virtual-marcacao-de-consulta">
</div>

<script type="text/javascript">
  (function (C, A, L) {
    let p = function (a, ar) {
      a.q.push(ar);
    };

    let d = C.document;

    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;

      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }

      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };

        const namespace = ar[1];

        api.q = api.q || [];

        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }

        return;
      }

      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  Cal("init", "saaj-virtual-marcacao-de-consulta", {
    origin: "https://app.cal.com"
  });

  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;

  Cal.ns["saaj-virtual-marcacao-de-consulta"]("inline", {
    elementOrSelector:
      "#my-cal-inline-saaj-virtual-marcacao-de-consulta",

    config: {
      layout: "month_view",
      useSlotsViewOnSmallScreen: "true"
    },

    calLink:
      "saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta"
  });

  Cal.ns["saaj-virtual-marcacao-de-consulta"]("ui", {
    hideEventTypeDetails: true,
    layout: "month_view"
  });
</script>

<!-- Cal inline embed code ends -->
```

---

# 4. Next.js Behaviour

The application should determine which Cal.com embed to display from the user's selected location.

```text
if province = Inhambane AND district = Maxixe
    → MAXIXE CAL.COM

if province = Inhambane AND district = Massinga
    → MASSINGA CAL.COM

otherwise
    → NO APPOINTMENT FUNCTIONALITY
```

The appointment option must therefore only appear in the SAAJ Virtual interface for users routed to **Maxixe** or **Massinga**.

---

# 5. User Experience

For Maxixe and Massinga, the assistant profile should expose three main actions:

```text
💬 Mensagem
📞 Ligar
📅 Marcar encontro
```

### Mensagem

Opens the corresponding **Voiceflow** agent.

### Ligar

Starts the corresponding **Vapi** voice assistant.

### Marcar encontro

Opens the corresponding **Cal.com inline embed** inside the SAAJ Virtual interface.

The user should not need to leave the SAAJ Virtual platform to complete the appointment booking.

---

# 6. Important Implementation Note

Although the Maxixe and Massinga embed snippets use the same Cal.com namespace:

```text
saaj-virtual-marcacao-de-consulta
```

they use different `calLink` values.

### Maxixe

```text
saaj-maxixe-8w8m61/saaj-virtual-marcacao-de-consulta
```

### Massinga

```text
saaj-massinga-0cr1s3/saaj-virtual-marcacao-de-consulta
```

The Next.js implementation must ensure that the correct `calLink` is loaded according to the user's selected district.