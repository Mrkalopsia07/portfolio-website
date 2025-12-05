# 🚀 How to Update Your Website

Whenever you make changes to your code (text, images, colors, etc.), follow these **3 simple steps** in the terminal to update your live website.

### Run these commands one by one:

**1. Stage your changes**
```bash
git add .
```

**2. Save your changes**
*Replace the message inside quotes with a description of your update.*
```bash
git commit -m "Describe your update here"
```

**3. Upload to Cloudflare**
```bash
git push
```

---

> [!NOTE]
> **Cloudflare will automatically detect the "push" and update your live site in about 60 seconds.**
>
> You do **NOT** need to run `npm run build`.
