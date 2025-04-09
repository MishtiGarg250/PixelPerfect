import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tracks = [
    {
      title: 'Web Development',
      description: 'Full roadmap to become a web developer.',
      modules: [
        {
          title: 'HTML & CSS Basics',
          items: [
            { title: 'Intro to HTML', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { title: 'Intro to CSS', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
          ],
        },
        {
          title: 'JavaScript Basics',
          items: [
            { title: 'Variables & Data Types', link: 'https://javascript.info/variables' },
            { title: 'Functions', link: 'https://javascript.info/function-basics' },
          ],
        },
      ],
    },
    {
      title: 'Android Development',
      description: 'Roadmap for native Android apps with Kotlin.',
      modules: [
        {
          title: 'Kotlin Basics',
          items: [
            { title: 'Variables in Kotlin' },
            { title: 'Functions in Kotlin' },
          ],
        },
      ],
    },
    {
      title: 'Competitive Programming',
      description: 'Improve your problem-solving skills.',
      modules: [
        {
          title: 'Number Theory',
          items: [
            { title: 'Prime Numbers' },
            { title: 'Modular Arithmetic' },
          ],
        },
      ],
    },
  ];

  for (const track of tracks) {
    const createdTrack = await prisma.track.create({
      data: {
        title: track.title,
        description: track.description,
        modules: {
          create: track.modules.map((mod) => ({
            title: mod.title,
            items: {
              create: mod.items.map((item) => ({
                title: item.title,
                link: item.link || null,
              })),
            },
          })),
        },
      },
    });
    console.log(`Created track: ${createdTrack.title}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
