import portrait from "../assets/portrait.jpg";

/** Confirmed profile data used by the hero card and other identity surfaces. */
export const PROFILE = {
  portrait: {
    src: portrait,
    alt: "Portrait of Vignesh T",
    width: 1044,
    height: 1507,
  },
  email: "vigneshrao1723@gmail.com",
  github: "https://github.com/vigneshrao1723-lab",
  linkedin: "https://www.linkedin.com/in/vignesh-t-33651b397/",
  resume: "/Vignesh_T_Resume.pdf",
  location: "Bengaluru, Karnataka",
  statement:
    "Computer Science & Systems Engineering focused on networking, applied cryptography, and AI engineering.",
  skills: ["Python", "Linux", "SQL", "Networking", "Cryptography", "RAG"],
} as const;
