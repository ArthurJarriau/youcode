import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateRank = (index: number) => {
  const base = "aaaaaa";
  const lastCharCode = base.charCodeAt(5) + index; // Incrémente la dernière lettre
  return base.substring(0, 5) + String.fromCharCode(lastCharCode);
};

const main = async () => {
  console.log("Seeding database...");

  // Création des utilisateurs
  const usersData = Array.from({ length: 10 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    image: faker.image.avatar(),
    createdAt: faker.date.past(),
  }));

  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true,
  });

  console.log(`✅ ${usersData.length} users created`);

  // Création des cours
  const coursesData = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    presentation: faker.lorem.paragraph(),
    image: faker.image.url(),
    createdAt: faker.date.past(),
    creatorId: faker.helpers.arrayElement(usersData).id,
    state: faker.helpers.arrayElement(["DRAFT", "PUBLISHED"]),
  }));

  await prisma.course.createMany({
    data: coursesData,
    skipDuplicates: true,
  });

  console.log(`✅ ${coursesData.length} courses created`);

  // Récupération des cours créés
  const createdCourses = await prisma.course.findMany();

  // Création des leçons avec rank en format "aaaaaa", "aaaaab", etc.
  const lessonsData = createdCourses.flatMap(course =>
    Array.from({ length: 3 }).map((_, index) => ({
      id: faker.string.uuid(),
      name: faker.lorem.words(3),
      rank: generateRank(index), // Génère un rank unique
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past(),
      courseId: course.id,
      state: faker.helpers.arrayElement(["HIDDEN", "PUBLISHED", "PUBLIC"]),
    }))
  );

  await prisma.lesson.createMany({
    data: lessonsData,
    skipDuplicates: true,
  });

  console.log(`✅ ${lessonsData.length} lessons created`);

  // Assignation des utilisateurs à des cours
  const courseOnUserData = createdCourses.flatMap(course => {
    const assignedUsers = faker.helpers.arrayElements(usersData, 3);
    return assignedUsers.map(user => ({
      id: faker.string.uuid(),
      userId: user.id,
      courseId: course.id,
      createdAt: faker.date.past(),
    }));
  });

  await prisma.courseOnUser.createMany({
    data: courseOnUserData,
    skipDuplicates: true,
  });

  console.log(`✅ ${courseOnUserData.length} course enrollments created`);

  console.log("✅ Seeding completed successfully!");
};

main()
  .catch(async error => {
    console.error("❌ Error during seeding:", error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
