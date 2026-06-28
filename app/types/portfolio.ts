export interface LinkItem {
  label: string
  href: string
}

export interface HeroStat {
  label: string
  value: string
}

export interface HeroPhoto {
  src: string
  alt: string
}

export interface HeroContent {
  name: string
  role: string
  headline: string
  summary: string
  location: string
  availability: string
  ctaPrimary: LinkItem
  ctaSecondary: LinkItem
  photo: HeroPhoto
  stats: HeroStat[]
}

export interface AboutContent {
  intro: string
  paragraphs: string[]
  strengths: string[]
}

export interface CardMedia {
  banner: string
  gallery: string[]
  alt: string
}

export interface SkillItem {
  label: string
  icon: string
}

export interface SkillGroup {
  title: string
  items: SkillItem[]
  media?: CardMedia
}

export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectItem {
  id: string
  title: string
  period: string
  summary: string
  stack: string[]
  highlights: string[]
  links: ProjectLink[]
  featured: boolean
  media: CardMedia
}

export interface JourneyItem {
  role: string
  company: string
  logo?: string
  period: string
  summary: string
  highlights: string[]
  media: CardMedia
}

export interface ContactContent {
  email: string
  linkedin: string
  github: string
  location: string
  note: string
}

export interface PortfolioPayload {
  hero: HeroContent
  about: AboutContent
  skills: SkillGroup[]
  projects: ProjectItem[]
  journey: JourneyItem[]
  contact: ContactContent
}

export interface ContactFormInput {
  name: string
  email: string
  message: string
  turnstileToken: string
}
