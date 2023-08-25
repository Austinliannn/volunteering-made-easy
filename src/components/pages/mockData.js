import poster from "../../assets/job.jpg";
import profilePic from "../../assets/man.png";

export const mockUsers = [
  {
    _id: "volunteer_id1",
    email: "johndoe@testmail.com",
    password: "hashed_password",
    firstName: "John",
    lastName: "Doe",
    organizationName: "",
    contact: "98765432",
    link: "www.johndoe.com",
    address: "",
    skill: ["Web Development", "HTML", "JavaScript"],
    location: ["Bedok"],
    image: profilePic,
    type: "volunteer"
  },
  {
    _id: "volunteer_id2",
    email: "joshdoe@testmail.com",
    password: "hashed_password",
    firstName: "Josh",
    lastName: "Doe",
    organizationName: "",
    contact: "98765432",
    link: "www.joshdoe.com",
    address: "",
    skill: ["Web Development", "HTML", "JavaScript"],
    location: ["Bedok"],
    image: profilePic,
    type: "volunteer"
  },
  {
    _id: "organization_id1",
    email: "helpinghand@testmail.com",
    password: "hashed_password",
    firstName: "",
    lastName: "",
    organizationName: "HelpingHands",
    contact: "98765432",
    link: "www.helpinghands.com",
    address: "123 Bedok Lane Singapore 123456",
    skill: [],
    location: [],
    image: '',
    type: "organization"
  },
];

export const mockEvents = [
  {
    _id: "event_id1",
    eventName: "Help the Dogs",
    cause: "Animal Welfare",
    shortDesc: "“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative.",
    description: "“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website to spread awareness and seek for volunteers who are interested to help. The website should consist of a few pages such as landing page, area tracking page, etc, etc. Reach out to us if you have the skills or wish to learn a new skill such as creating websites.",
    startDate: "2023-02-20",
    endDate: "2023-04-20",
    inCharge: "Albert",
    contact: "98765432",
    skill: ["Web Development", "HTML", "JavaScript"],
    location: ["Bedok", "Bayshore"],
    completed: false,
    image: poster,
    organizationId: mockUsers[2],
    applicants: [mockUsers[0]],
    acceptedVolunteers: [mockUsers[0]],
  },
  {
    _id: "event_id2",
    eventName: "Help the Cats",
    cause: "Animal Welfare",
    shortDesc: "“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website for this initiative.",
    description: "“Help the Dogs” is a initiative to rescue abandon dogs who are left behind by their owners. We aim to create a website to spread awareness and seek for volunteers who are interested to help. The website should consist of a few pages such as landing page, area tracking page, etc, etc. Reach out to us if you have the skills or wish to learn a new skill such as creating websites.",
    startDate: "2023-02-20",
    endDate: "2023-04-20",
    inCharge: "Albert",
    contact: "98765432",
    skill: ["Web Development", "HTML", "JavaScript"],
    location: ["Bedok"],
    completed: true,
    image: poster,
    organizationId: mockUsers[2],
    applicants: [mockUsers[1]],
    acceptedVolunteers: [mockUsers[0]],
  },
];

export const mockAcceptedEvents = [
  {
    _id: "accepted_event_id1",
    volunteerId: mockUsers[0],
    eventId: mockEvents[0],
    totalHours: 0,
    checkInDateTime: "",
    checkOutDateTime: "",
  },
];