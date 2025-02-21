const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('../models/resources.model'); // Adjust the path as needed

dotenv.config();

const resources = [
    {
        "resourceType": "Communication",
        "title": "Autism and Language Development: Will My Child Ever Speak?",
        "author": "Autism Parenting Magazine",
        "content": "This resource addresses common concerns about speech delays in autistic children, offering insights into language milestones, strategies for encouraging verbal communication, and success stories of nonverbal individuals finding alternative ways to express themselves.",
        "link": "https://www.autismparentingmagazine.com/autism-language-development/"
    },
    {
        "resourceType": "Sensory",
        "title": "Autism and Sensory Sensitivities: A Closer Look",
        "author": "Rainbow Therapy",
        "content": "Explores how sensory processing differences impact daily life for autistic individuals. Topics include hypersensitivity to sounds/textures, sensory-friendly environments, and practical coping strategies for families and educators.",
        "link": "https://www.rainbowtherapy.org/blogs-autism-and-sensory-sensitivities-a-closer-look/"
    },
    {
        "resourceType": "Emotional",
        "title": "Understanding & Managing Meltdowns: A Guide for Parents",
        "author": "P.E.A.R.S.",
        "content": "A comprehensive guide to identifying meltdown triggers, differentiating meltdowns from tantrums, and de-escalation techniques. Includes real-life scenarios and step-by-step calming strategies.",
        "link": "https://www.pearspllc.com/understanding-managing-meltdowns-a-guide-for-parents/"
    },
    {
        "resourceType": "Routines",
        "title": "Tips to Create a Routine for a Child with Autism",
        "author": "MySpotCare",
        "content": "Practical advice for designing structured daily routines, visual schedules, and transition tools to reduce anxiety and improve predictability for autistic children.",
        "link": "https://myspotcare.com/create-routine-for-kids-with-autism/"
    },
    {
        "resourceType": "Social",
        "title": "Autism and Social Cues: Understanding the Challenges",
        "author": "Autism Parenting Magazine",
        "content": "Discusses difficulties autistic individuals face in interpreting facial expressions, tone of voice, and body language. Provides exercises to teach social cues and foster meaningful interactions.",
        "link": "https://www.autismparentingmagazine.com/autism-and-social-cues/"
    },
    {
        "resourceType": "Communication",
        "title": "What is Augmentative and Alternative Communication (AAC)?",
        "author": "Autism.org.uk",
        "content": "Explains AAC tools like PECS, sign language, and speech-generating devices. Highlights how AAC empowers nonverbal individuals to communicate effectively.",
        "link": "https://www.autism.org.uk/advice-and-guidance/professional-practice/aug-alt-comm"
    },
    {
        "resourceType": "Emotional",
        "title": "Managing Stress and Anxiety in Autism",
        "author": "Rainbow Therapy",
        "content": "Identifies common stressors for autistic individuals and offers mindfulness techniques, sensory tools, and structured routines to reduce anxiety.",
        "link": "https://www.rainbowtherapy.org/bloghow-to-manage-stress-and-anxiety-in-autism/"
    },
    {
        "resourceType": "Routines",
        "title": "Toilet Training Guide for Children with Autism",
        "author": "Autism Speaks",
        "content": "A downloadable PDF with step-by-step methods, visual aids, and patience-building tips for successful toilet training tailored to sensory and communication needs.",
        "link": "https://www.autismspeaks.org/sites/default/files/2018-08/Toilet%20Training%20Guide.pdf"
    },
    {
        "resourceType": "Social",
        "title": "Helping Autistic Children Make Friends",
        "author": "NeuroLaunch",
        "content": "Strategies to foster peer connections through shared interests, role-playing social scenarios, and creating inclusive play opportunities.",
        "link": "https://neurolaunch.com/how-to-help-autistic-child-make-friends/"
    },
    {
        "resourceType": "Sensory",
        "title": "Creating Sensory-Friendly Classrooms",
        "author": "NeuroLaunch",
        "content": "Guidance on designing classrooms with adjustable lighting, quiet zones, and flexible seating to accommodate sensory needs and enhance learning.",
        "link": "https://neurolaunch.com/sensory-autism-classroom/"
    },
    {
        "resourceType": "Emotional",
        "title": "Executive Challenges in Autism & ADHD",
        "author": "Embrace Autism",
        "content": "Explores difficulties with planning, organization, and time management. Offers tools like visual planners and breaking tasks into smaller steps.",
        "link": "https://embrace-autism.com/executive-challenges-in-autism-and-adhd/"
    },
    {
        "resourceType": "Communication",
        "title": "Autistic Speech & Nonverbal Communication Differences",
        "author": "Embrace Autism",
        "content": "Highlights unique communication styles, including echolalia, scripting, and preference for written over verbal interaction. Emphasizes acceptance over 'fixing' behaviors.",
        "link": "https://embrace-autism.com/autistic-verbal-and-nonverbal-communication-differences/"
    }
];

const seedResources = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Resource.deleteMany(); // Clear existing resources
    await Resource.insertMany(resources); // Insert new resources

    console.log('Resources seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding resources:', error);
    process.exit(1);
  }
};

seedResources();