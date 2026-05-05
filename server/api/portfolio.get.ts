import type { PortfolioPayload } from '~/types/portfolio'

const SIMPLE_ICONS_VERSION = '16.16.0'
const si = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@${SIMPLE_ICONS_VERSION}/icons/${slug}.svg`

export default defineEventHandler((): PortfolioPayload => {
  return {
    hero: {
      name: 'Joshua Paulo Ynzon',
      role: 'Software Developer',
      headline: 'Joshua Paulo Ynzon',
      summary:
        'Software developer with production experience supporting multi-country e-commerce platforms. I design and maintain Laravel APIs, shape scalable database schemas, and deliver frontend features with Vue and Nuxt.',
      location: 'Toledo City, Cebu, Philippines',
      availability: 'Open to software developer roles and collaborative product work',
      ctaPrimary: {
        label: 'View Projects',
        href: '#projects'
      },
      ctaSecondary: {
        label: 'Contact Me',
        href: '#contact'
      },
      photo: {
        src: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1778002610/Joshua_Paulo_Avatar_zsq7d3.webp',
        alt: 'Portrait placeholder for Joshua Paulo Ynzon'
      },
      stats: [
        { value: '2+ Years', label: 'Professional Experience' },
        { value: '8 Markets', label: 'International E-commerce Support' },
        { value: 'Infinite caffeine', label: 'Energy Level' }
      ]
    },
    about: {
      intro:
        "I'm Joshua, a software developer from Toledo City, Cebu, focused on building dependable systems with clean architecture and practical execution.",
      paragraphs: [
        'I enjoy turning complex business workflows into software that teams can trust day to day. Most of my professional work has been backend-focused, building Laravel APIs for shipping schedules, tracking imports, and multi-country e-commerce operations.',
        'I work comfortably across the stack when needed, using Vue and Nuxt to ship frontend features that align with backend constraints. That full-stack context helps me make better tradeoffs and deliver features end to end.',
        'Beyond coding, I value collaboration and clarity. My experience as an IT instructor strengthened how I explain technical ideas, support teammates, and keep delivery moving with calm ownership.'
      ],
      strengths: [
        'Backend-first engineer with full-stack execution capability',
        'RESTful API architecture for multi-country e-commerce workflows',
        'Database design, ERD planning, and performance tuning',
        'Production issue handling with stable, iterative releases',
        'Clear communication with product, support, and frontend teams'
      ]
    },
    skills: [
      {
        title: 'Languages',
        items: [
          { label: 'PHP', icon: si('php') },
          { label: 'JavaScript', icon: si('javascript') },
          { label: 'Python', icon: si('python') },
          { label: 'HTML', icon: si('html5') },
          { label: 'CSS', icon: si('css') }
        ]
      },
      {
        title: 'Frontend',
        items: [
          { label: 'Vue.js', icon: si('vuedotjs') },
          { label: 'Nuxt.js', icon: si('nuxtdotjs') },
          { label: 'Vuetify', icon: si('vuetify') },
          { label: 'React.js', icon: si('react') },
          { label: 'SCSS', icon: si('sass') }
        ]
      },
      {
        title: 'Backend',
        items: [
          { label: 'Laravel', icon: si('laravel') },
          { label: 'Node.js', icon: si('nodedotjs') },
          { label: 'Express.js', icon: si('express') },
          { label: 'Django', icon: si('django') },
          { label: 'RESTful API Design', icon: si('openapiinitiative') }
        ]
      },
      {
        title: 'Data',
        items: [
          { label: 'MySQL', icon: si('mysql') },
          { label: 'PostgreSQL', icon: si('postgresql') },
          { label: 'ERD Planning', icon: si('simpleicons') },
          { label: 'Schema Design', icon: si('simpleicons') },
          { label: 'Query Optimization', icon: si('simpleicons') }
        ]
      },
      {
        title: 'DevOps and Tools',
        items: [
          { label: 'Git', icon: si('git') },
          { label: 'GitHub', icon: si('github') },
          { label: 'Postman', icon: si('postman') },
          { label: 'Jenkins', icon: si('jenkins') },
          { label: 'Vagrant', icon: si('vagrant') },
          { label: 'Laravel Homestead', icon: si('laravel') },
          { label: 'DigitalOcean', icon: si('digitalocean') },
          { label: 'cPanel', icon: si('cpanel') },
          { label: 'Figma', icon: si('figma') }
        ]
      }
    ],
    projects: [
      {
        id: 'global-ecommerce',
        title: 'Global E-commerce Operations Platform',
        period: '2025 to 2026',
        summary:
          'Developed and maintained operations-driven APIs and supporting frontend integrations for international e-commerce teams.',
        stack: ['Laravel', 'Nuxt.js', 'Vue.js', 'MySQL'],
        highlights: [
          'Built production and shipping schedule modules for country-specific workflows.',
          'Implemented courier tracking data import and management flows.',
          'Standardized API responses across EN, KR, and JP storefronts.'
        ],
        media: {
          banner: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714141/image_1_vxrqv4.png',
          gallery: [
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714353/image_4_ia12md.png',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714351/image_3_e0rquz.png',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714352/image_2_r53tx8.png'
          ],
          alt: 'Global e-commerce systems dashboard placeholder image'
        },
        links: [
          { label: 'Dev Website', href: 'https://dev.musticker.com'}
        ],
        featured: true
      },
      {
        id: 'passaquiz',
        title: 'PassaQuiz',
        period: '2024 to 2025',
        summary:
          'Developed quiz and admin modules with Laravel and Vue, focusing on maintainability and delivery speed.',
        stack: ['Vue.js', 'Vuetify', 'Laravel', 'DigitalOcean', 'Ploi'],
        highlights: [
          'Built admin and quiz features for content creation and publishing.',
          'Implemented and optimized REST APIs for smoother data flow.',
          'Supported Agile delivery and cloud deployment workflows.'
        ],
        media: {
          banner: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1777715281/1744085700244_csvstf.jpg',
          gallery: [
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777715183/1738808061569_ze1cfj.jpg',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777715184/1738808024976_jbntgg.jpg',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777715184/1738808143091_s6fjy5.jpg',
          ],
          alt: 'PassaQuiz platform placeholder image'
        },
        links: [
          { label: 'Dev Website', href: 'https://games.passafund.com'}
        ],
        featured: true
      },
      {
        id: 'wealthme',
        title: 'WealthMe',
        period: '2025',
        summary:
          'Built a personal finance app covering income, expense tracking, and budget insights.',
        stack: ['Vue.js', 'Vuetify', 'Laravel', 'MySQL'],
        highlights: [
          'Developed core budgeting workflows and dashboard features.',
          'Integrated AI-powered financial tips through backend endpoints.',
          'Improved database performance with indexing and query refinement.'
        ],
        media: {
          banner: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1777715281/1743933702974_rrccie.jpg',
          gallery: [
            // 'https://picsum.photos/seed/wealthme-gallery-1/420/280',
            // 'https://picsum.photos/seed/wealthme-gallery-2/420/280',
            // 'https://picsum.photos/seed/wealthme-gallery-3/420/280'
          ],
          alt: 'WealthMe finance app placeholder image'
        },
        links: [],
        featured: true
      },
      {
        id: 'quick-bites',
        title: 'Quick Bites',
        period: '2024',
        summary:
          'Created a pre-order platform for food businesses with responsive ordering and secure backend processing.',
        stack: ['Vue.js', 'Laravel', 'DigitalOcean'],
        highlights: [
          'Implemented order lifecycle APIs and admin order management.',
          'Built responsive user flows for browse-to-checkout.',
          'Configured cloud-ready deployment with DigitalOcean Spaces.'
        ],
        media: {
          banner: 'https://picsum.photos/seed/quick-bites-banner/1200/675',
          gallery: [
            'https://picsum.photos/seed/quick-bites-gallery-1/420/280',
            'https://picsum.photos/seed/quick-bites-gallery-2/420/280',
            'https://picsum.photos/seed/quick-bites-gallery-3/420/280'
          ],
          alt: 'Quick Bites ordering platform placeholder image'
        },
        links: [],
        featured: false
      }
    ],
    journey: [
      {
        role: 'Back End Web Developer',
        company: 'Glophics PH Inc.',
        period: 'May 2025 to April 2026',
        summary:
          'Owned business-critical API development for international e-commerce operations and collaborated with product, support, and frontend teams to deliver stable releases.',
        highlights: [
          'Designed scalable REST endpoints and standardized API structures.',
          'Implemented shipping, schedule, tracking, and authentication features.',
          'Contributed to ERD planning and schema decisions for localization needs.'
        ],
        media: {
          banner: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714141/image_1_vxrqv4.png',
          gallery: [
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714353/image_4_ia12md.png',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714351/image_3_e0rquz.png',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714352/image_2_r53tx8.png'
          ],
          alt: 'Backend development work journey placeholder image'
        }
      },
      {
        role: 'Software Engineer Intern',
        company: 'Passafund',
        period: 'June 2024 to January 2025',
        summary:
          'Built full-stack features for quiz and admin products while improving maintainability through refactoring.',
        highlights: [
          'Developed AdminCMS and Quiz modules using Vue and Laravel.',
          'Improved API responsiveness and integration clarity.',
          'Supported Agile delivery and cloud deployments.'
        ],
        media: {
          banner: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714822/passafund-02_hil4m4.webp',
          gallery: [
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1777714822/passafund-01_k1fjkx.webp',
          ],
          alt: 'Software engineering internship journey placeholder image'
        }
      },
      {
        role: 'College IT Instructor',
        company: 'Consolatrix College of Toledo City, Inc.',
        period: 'June 2025 to October 2025',
        summary:
          'Taught practical system administration and Laravel client-server fundamentals with hands-on training.',
        highlights: [
          'Delivered sessions on networking and server concepts.',
          'Guided students through MVC, routing, and API development.',
          'Focused on practical problem solving and real-world implementation.'
        ],
        media: {
          banner: '',
          gallery: [
            '',
            '',
            ''
          ],
          alt: 'IT instructor journey placeholder image'
        }
      }
    ],
    contact: {
      email: 'joshuapauloynzon@gmail.com',
      linkedin: 'https://www.linkedin.com/in/jpynzon/',
      github: 'https://github.com/jpynzon',
      location: 'Toledo City, Cebu, Philippines',
      note: 'I am open to software developer opportunities, freelance product work, and collaborative engineering builds.'
    }
  }
})

