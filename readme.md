<img width="1910" height="962" alt="image" src="https://github.com/user-attachments/assets/cd5b64e8-3233-405d-860d-7b57d42be690" />⚡ Landing Page Builder

A customizable landing page generator built with **Next.js**, **TailwindCSS**, and **TypeScript**.
Users can create landing pages by selecting themes, layouts, fonts, and customizing content such as hero sections, about, services, testimonials, and contact forms.


✨ Features

🎨 **Themes/Color Schemes** → Light, Dark, Gradient.
📐 **Layouts** → Centered Hero, Left Image + Right Text, Full-width Banner.
✍️ **Typography** → Choose from Sans, Serif, or Mono fonts.
📝 **Content Builder** → Hero title, subtitle, CTA button text & link.
 🔀 **Sections Toggle** → Enable/disable About, Services, Testimonials, Contact.
 🖼️ **Image Support** → Upload images or use placeholders.
⚡ **Live Preview** → Instantly see updates as you customize.
📱 **Responsive** → Mobile-friendly design.


## 🛠️ Tech Stack

*Next.js 14 (App Router)
*React 18
*TailwindCSS
*TypeScript
*Context API** (for global state management)


🚀 Getting Started

 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/landing-page-builder.git
cd landing-page-builder
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)


## 📂 Project Structure


landing-page-builder/
src/
├── app/
│ ├── builder/ # Main builder UI
│ │ └── page.tsx
│ ├── preview/[id]/ # Preview page
│ │ └── page.tsx
│ ├── globals.css # Global styles
│ ├── layout.tsx # App layout
│ └── page.tsx # Landing page entry
│
├── components/
│ ├── sections/ # Section Components
│ │ ├── AboutSection.tsx
│ │ ├── ContactSection.tsx
│ │ ├── ServicesSection.tsx
│ │ └── TestimonialsSection.tsx
│ ├── ExportModal.tsx
│ ├── PreviewPane.tsx
│ └── SideControls.tsx
│
├── context/
│ └── BuilderContext.tsx # Global state management
│
├── utils/
│ └── theme.ts # Theme utilities


📸 Screenshots

**Builder Interface:**
<img width="1913" height="963" alt="image" src="https://github.com/user-attachments/assets/950162df-e35b-4462-b963-adb00eb76891" />


**Generated Landing Page Example:**
*(add screenshot here)*

---

## ⚙️ Deployment

Deploy easily with **Vercel**:

```bash
npm run build
```

Then push to GitHub and connect your repo with Vercel.

---

## 🤝 Contributing

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "Add some feature"`)
4. Push to branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

👉 Do you also want me to include a **"Future Enhancements"** section (like drag-and-drop, AI content generation, templates)?
