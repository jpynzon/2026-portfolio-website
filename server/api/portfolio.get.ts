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
        'Full-stack developer with production experience building and maintaining a multi-brand sticker e-commerce operation across seven country storefronts. I design and maintain Laravel APIs, shape scalable database schemas, and ship frontend features with Vue and Nuxt.',
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
        { value: '7 Markets', label: 'International E-commerce Storefronts' },
        { value: 'Infinite caffeine', label: 'Energy Level' }
      ]
    },
    about: {
      intro:
        "I'm Joshua, a software developer from Toledo City, Cebu, focused on building dependable systems with clean architecture and practical execution.",
      paragraphs: [
        'I enjoy turning complex business workflows into software that teams can trust day to day. Most of my professional work centers on a multi-brand e-commerce platform serving seven country storefronts (Korea, Japan, the US, Canada, Australia, New Zealand, and Singapore), where I build Laravel APIs for authentication, shipping schedules, courier tracking, and order operations.',
        'I work across the stack — Laravel and MySQL on the backend, Vue and Nuxt with TypeScript on the frontend — and I lean on AI-assisted tools like Claude Code to ship faster without losing maintainability. That full-stack context helps me make better tradeoffs and deliver features end to end.',
        'I have owned real systems in production: customer authentication with OTP and social SSO, production and shipping scheduling, courier tracking, and internationalization across markets. I care about clarity and ownership, and keep delivery calm and steady under real-world constraints.'
      ],
      strengths: [
        'Full-stack engineer with strong backend depth (Laravel + Vue/Nuxt)',
        'RESTful API architecture for multi-country e-commerce workflows',
        'Authentication, SSO, and internationalization for global storefronts',
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
          { label: 'Pinia', icon: si('pinia') },
          { label: 'Vuetify', icon: si('vuetify') },
          { label: 'React.js', icon: si('react') },
          { label: 'TypeScript', icon: si('typescript') },
          { label: 'SCSS', icon: si('sass') }
        ]
      },
      {
        title: 'Backend',
        items: [
          { label: 'Laravel', icon: si('laravel') },
          { label: 'Laravel Passport', icon: si('laravel') },
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
          { label: 'AWS CodeCommit', icon: si('amazonwebservices') },
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
        id: 'aion-tempest',
        title: 'Aion Tempest',
        period: '2026',
        summary:
          'A full-stack website and player account portal for the Aion Tempest private MMORPG server, built with Laravel 12 and Tailwind CSS. It plugs directly into the live Aion game database to handle account registration and authentication, live realm status, rankings, downloads, VIP memberships, redeem codes, and an in-game currency (Toll) shop.',
        stack: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'MySQL', 'Vite'],
        highlights: [
          'Built the player account system on Laravel 12: registration, login, email verification (signed URLs and throttling), and password reset, backed by the game account_data table.',
          'Integrated with the live Aion MySQL database (players, legions, abyss ranks) to power real-time realm and server status plus the rankings boards.',
          'Implemented the rankings engine: Abyss points, Glory points, level, kills, and legion boards with search, faction and class filters, and pagination.',
          'Shipped monetization and account features: a Toll in-game currency shop, VIP memberships, and redeemable codes.',
          'Rendered every page with Blade and Tailwind CSS v4 via Vite, added launcher auto-update and maintenance flows, and covered the app with Pest tests.'
        ],
        media: {
          banner: 'https://res.cloudinary.com/du6rliaeg/image/upload/v1784472840/home_t9axjc.webp',
          gallery: [
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1784472840/ranking_mtfymv.webp',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1784472840/shop_l7rvxx.webp',
            'https://res.cloudinary.com/du6rliaeg/image/upload/v1784472840/download_lesxxi.webp'
          ],
          alt: 'Aion Tempest private server website'
        },
        links: [
          { label: 'Live Website', href: 'https://www.aiontempest.com/' }
        ],
        featured: true
      },
      {
        id: 'global-ecommerce',
        title: 'Multi-Brand E-commerce Platform (7 Markets)',
        period: '2025 to 2026',
        summary:
          'Core developer on a multi-brand sticker e-commerce platform serving seven country storefronts (Korea, Japan, the US, Canada, Australia, New Zealand, and Singapore). Built and maintained operations-critical APIs, admin tooling, and storefront features.',
        stack: ['Laravel', 'Nuxt.js', 'Vue.js', 'TypeScript', 'MySQL'],
        highlights: [
          'Built end-to-end customer authentication: OTP verification, password reset, Google/Kakao SSO, and trusted-device login with Laravel Passport.',
          'Owned Production & Shipping Schedule Management across all storefronts, computing delivery dates across holidays and courier off-days.',
          'Built Manage Shipping and Glophics Shipping admin modules: order merging/splitting, batch numbering, and CSV export.',
          'Implemented Tracking Management, centralized order-status workflows, and invoice/job-details PDF generation.',
          'Delivered internationalization (including Korea and Japan) and hardened the platform with SQL-injection detection and an audit trail.'
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
          { label: 'Live Website', href: 'https://www.musticker.com/kr'}
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
        links: [],
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
        role: 'Full Stack Web Developer',
        company: 'Glophics PH Inc.',
        logo: '/images/company/glophics.webp',
        period: 'May 2025 to Present',
        summary:
          'Core developer on the company\'s sticker e-commerce platform powering seven country storefronts. Maintained the existing brand sites and shipped new platform features, collaborating with product, support, and frontend teams to deliver stable releases.',
        highlights: [
          'Built the customer authentication system (OTP, Google/Kakao SSO, trusted device) with Laravel Passport and cookie-based auth.',
          'Owned production & shipping scheduling, manage-shipping tooling, courier tracking, and order/invoice workflows across markets.',
          'Delivered internationalization (KR/JP), search, and platform hardening; contributed to ERD design and a service/repository architecture using AI-assisted tools.'
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
        company: 'nCase PH',
        logo: '/images/company/ncase.webp',
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
        logo: '/images/company/cctc.webp',
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

