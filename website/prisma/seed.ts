import { PrismaClient } from '@prisma/client';
import { CATEGORIES, MOCK_MENU, MOCK_REVIEWS, MOCK_RECLAMATIONS } from '../src/data/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding PostgreSQL database "leCrispy"...');

  // Seed Categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {},
      create: {
        id: cat.id,
        nameFr: cat.name.fr,
        nameAr: cat.name.ar,
        nameEn: cat.name.en,
        icon: cat.icon
      }
    });
  }

  // Seed Menu Items
  for (const item of MOCK_MENU) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        nameFr: item.name.fr,
        nameAr: item.name.ar,
        nameEn: item.name.en,
        descFr: item.description.fr,
        descAr: item.description.ar,
        descEn: item.description.en,
        price: item.price,
        category: item.category,
        image: item.image,
        spiceLevel: item.spiceLevel,
        isHealthy: item.isHealthy,
        isPopular: item.isPopular || false,
        isNew: item.isNew || false,
        preparationTimeMinutes: item.preparationTimeMinutes,
        calories: item.nutrition?.calories,
        protein: item.nutrition?.protein,
        carbs: item.nutrition?.carbs,
        fat: item.nutrition?.fat,
        dietTags: item.dietTags || []
      }
    });
  }

  // Seed Reviews
  for (const rev of MOCK_REVIEWS) {
    await prisma.review.upsert({
      where: { id: rev.id },
      update: {},
      create: {
        id: rev.id,
        userName: rev.userName,
        userAvatar: rev.userAvatar,
        rating: rev.rating,
        comment: rev.comment,
        isApproved: rev.isApproved,
        reply: rev.reply
      }
    });
  }

  // Seed Reclamations
  for (const rec of MOCK_RECLAMATIONS) {
    await prisma.reclamation.upsert({
      where: { id: rec.id },
      update: {},
      create: {
        id: rec.id,
        orderId: rec.orderId,
        userName: rec.userName,
        userEmail: rec.userEmail,
        userPhone: rec.userPhone,
        subject: rec.subject,
        description: rec.description,
        status: rec.status,
        adminNote: rec.adminNote
      }
    });
  }

  // Seed Default Admin & Customer Users (moussaoui amani)
  await prisma.user.upsert({
    where: { email: 'amanimoussaoui06@gmail.com' },
    update: {
      name: 'moussaoui amani',
      phone: '+216 27 500 246'
    },
    create: {
      email: 'amanimoussaoui06@gmail.com',
      name: 'moussaoui amani',
      phone: '+216 27 500 246',
      role: 'customer',
      addresses: {
        create: {
          title: 'Résidence Principale',
          street: '1 rue Jean de Dormans',
          city: 'Dormans',
          zipCode: '51700',
          phone: '+216 27 500 246',
          isDefault: true
        }
      }
    }
  });

  await prisma.user.upsert({
    where: { email: 'amounatahfouna443@gmail.com' },
    update: {
      name: 'moussaoui amani',
      phone: '+216 27 500 246'
    },
    create: {
      email: 'amounatahfouna443@gmail.com',
      name: 'moussaoui amani',
      phone: '+216 27 500 246',
      role: 'admin',
      addresses: {
        create: {
          title: 'Résidence Principale',
          street: '1 rue Jean de Dormans',
          city: 'Dormans',
          zipCode: '51700',
          phone: '+216 27 500 246',
          isDefault: true
        }
      }
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@lecrispy.fr' },
    update: {},
    create: {
      email: 'admin@lecrispy.fr',
      name: 'Admin Le Crispy',
      phone: '+33 6 99 99 99 99',
      role: 'admin',
      addresses: {
        create: {
          title: 'Siège Le Crispy',
          street: '42 Avenue des Champs-Élysées',
          city: 'Paris',
          zipCode: '75008',
          phone: '+33 6 99 99 99 99',
          isDefault: true
        }
      }
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
