// qtype should be one of following: [text, multi-text, radio, checkbox, file]
// incase of text & file options will be empty

const seeds = [
  {
    section: "Organizational Information",
    question: "What is your organization's website address?",
    qtype: "text",
    options: [],
  },
  {
    section: "Organizational Information",
    question: "What grant type are you applying for?",
    qtype: "radio",
    options: ["GOS", "GPS", "LAP"],
  },
  {
    section: "Organizational Information",
    question: "What discipline?",
    qtype: "radio",
    options: [
      "Arts Education",
      "County Arts Agency",
      "Crafts",
      "Dance",
      "Film/Radio",
      "Folk Arts",
      "Literature",
      "Media",
      "Multi-Disciplinary",
      "Music",
      "Opera/Musical Theatre",
      "Presenters",
      "Theatre",
      "Visual Arts",
    ],
  },
  {
    section: "Organizational Information",
    question: "Please provide your organization's mission.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Organizational Information",
    question:
      "Please provide one paragraph describing the programming your organization offers.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Organizational Information",
    question:
      "Please indicate the types of events your organization offers. Check all that apply.",
    qtype: "checkbox",
    options: [
      "Teen Arts",
      "Lectures/Workshops",
      "Concerts/Plays/Musicals",
      "Exhibits",
      "Docent tours",
      "Poetry/Play Readings",
      "Outdoor events",
      "Film",
    ],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Has your organization used the ADA Self-Assessment Survey Tool or contracted a professional assessment of its facilities and programs.",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "If yes, explain the process your organization used to conduct the assessment, who from the organization was involved and how you plan to use the assessment in the future. If no, what is your process and timeline for completing a self-assessment?",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "If you have completed a self-assessment, what is the date of your most recently completed self- assessment?",
    qtype: "text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Does your organization have a board-approved policy statement regarding ADA compliance?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question: "If yes, upload your policy here.",
    qtype: "file",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "If your organization has adopted a policy, what date was the ADA policy statement adopted?",
    qtype: "text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Does your organization have/share an ADA coordinator or have a designated individual who is responsible for access services/programs?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  //! ------------------------------------------- Question 16 start

  //! ------------------------------------------- Question 16 end

  {
    section: "Organizational Policies and Practices",
    question: "Does your organization have/share an Access advisory board?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "If yes, please provide advisory board information, including names and affiliations. Indicate persons with a disability with an asterisk. If no, what are your plans and timeline for establishing one?",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Does your organization offer sensitivity training to staff, board, and/or volunteers on an annual basis?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "If yes, provide a description of the training, who conducts the sessions, and their qualifications. If not offered, what is the process and timeline for offering training opportunities?",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Has a representative of your organization attended ADA Plan Workshops and/or Access Thursday Roundtables provided by the Cultural Access Network Project within the past two years?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question: "Does your organization have a dedicated access budget?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "If yes, what is the annual budget allocation for access? If no, what is your plan and timeline to establish an access budget?",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Does your organization have an Emergency Preparedness Plan that includes provisions for people with disabilities (i.e; audience/visitors, staff, volunteers, artists, etc.)?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question: "If yes, upload your plan here.",
    qtype: "file",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question: "If yes, what date was the emergency preparedness plan adopted?",
    qtype: "text",
    options: [],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Do you solicit feedback from people with disabilities regarding your accessibility services, marketing, and programming?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question:
      "Does your organization have a policy on admitting service animals?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Organizational Policies and Practices",
    question: "If yes, please upload your policy here.",
    qtype: "file",
    options: [],
  },
  {
    section: "Employment/Volunteer Practices",
    question:
      "Does your organization have an employment non-discrimination policy statement that includes people with disabilities?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Employment/Volunteer Practices",
    question: "Upload your policy here",
    qtype: "file",
    options: [],
  },
  {
    section: "Employment/Volunteer Practices",
    question:
      "Does your organization offer employment/volunteer forms in alternate formats or offer assistance in filling out employment form?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Employment/Volunteer Practices",
    question:
      "Does your organization have a plan to provide reasonable accommodations for meetings and employee/volunteer interviews if its current office is not accessible?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Employment/Volunteer Practices",
    question:
      "Is your organization proactive in hiring artists/staff/volunteers with disabilities?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Employment/Volunteer Practices",
    question:
      "When hiring, it is important to identify the essential and marginal functions of the job. If you have a sample job description for staff and volunteers that separates marginal and essential functions, please upload here:",
    qtype: "file",
    options: [],
  },
  {
    section: "Grievance Procedure",
    question:
      "Does the organization have a board-approved procedure for accepting grievances from the public?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Grievance Procedure",
    question: "If yes, please upload the procedure here",
    qtype: "file",
    options: [],
  },
  {
    section: "Grievance Procedure",
    question: "If yes, what date was it adopted?",
    qtype: "text",
    options: [],
  },
  {
    section: "Virtual/Digital Programming",
    question:
      "Does your organization currently offer or plan to offer virtual programming (i.e; online readings, performances, webinars, videos, workshops, classes, exhibits, etc).",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Virtual/Digital Programming",
    question:
      "Does your organization plan to continue both virtual and in-person programming post COVID?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Virtual/Digital Programming",
    question:
      "Are you currently incorporating or do you plan to incorporate access services (I.e; open captioning, sign interpretation, audio description, services for those on the spectrum, etc.) with any of your virtual programs?",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Program Offerings for those with Hearing Loss and those who are Deaf",
    question:
      "An assistive listening system is provided in assembly areas, seating areas, and/or for guided tours or lectures.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Program Offerings for those with Hearing Loss and those who are Deaf",
    question:
      "Sign language interpretation of performances, guided tours, or lectures.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Program Offerings for those with Hearing Loss and those who are Deaf",
    question:
      "Open/closed captioning at performances, lectures, tours, workshops, or for film/video.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Program Offerings for those with Hearing Loss and those who are Deaf",
    question:
      "Advance copies of scripts, synopses, or overview of event provided.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Program Offerings for those with Hearing Loss and those who are Deaf",
    question: "Printed self-guided tours.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Program Offerings for those with Hearing Loss and those who are Deaf",
    question: "Printed self-guided tours.",
    qtype: "text",
    options: [],
  },
  {
    section: "Program Offerings for those with Vision Loss",
    question: "Audio-described performances or guided tours.",
    qtype: "text",
    options: [],
  },
  {
    section: "Program Offerings for those with Vision Loss",
    question: "Sensory seminars in conjunction with an event or exhibition.",
    qtype: "text",
    options: [],
  },
  {
    section: "Program Offerings for those with Vision Loss",
    question:
      "Braille materials (programs, exhibit or display signage, and/or other materials).",
    qtype: "text",
    options: [],
  },
  {
    section: "Program Offerings for those with Vision Loss",
    question:
      "Materials are available online (event brochures, programs, exhibit or display information, etc.)",
    qtype: "text",
    options: [],
  },
  {
    section: "Program Offerings for those with Vision Loss",
    question:
      "Digital media of exhibits, such as MP3 digital audio, smartphone, podcast, or other recordings.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Programming for Individuals with Autism, Cognitive Disabilities or Developmental Disabilities.",
    question:
      "Programming and services for individuals with autism, cognitive disabilities, or developmental disabilities.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "Organization has an accessible website providing basic accessibility features (high contrast, adjustable type size, alternate text for images, plain text option, etc.)",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question: "Organization has an accessibility statement on their website.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "Organization has an accessibility section on the website that promotes accessible programs and services to patrons/visitors.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "Does your organization sell event tickets online through your website or through an outside provider?.",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "Organization offers seating diagram or chart showing location of accessible seating for ticket sales on its website or through an online ticketing service.",
    qtype: "text",
    options: [],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "Organization offers tickets in all price ranges to people with disabilities and up to three companions requesting accessible seating.",
    qtype: "text",
    options: ["Yes", "No"],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "If yes, please explain the details here. If not, please explain your plan and timeline to implement this ticketing policy.",
    qtype: "multi-text",
    options: [],
  },
  {
    section:
      "Effective Communications (Publications, Marketing/Outreach, Website)",
    question:
      "Organization offers discounted ticket prices to individuals with disabilities and their companion.",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Marketing materials are available or offered in alternate formats (e.g. large print/Braille/electronic media).",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Social media posts are accessible (e.g. Alt text, captioned videos, image descriptions).",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Brochures and other marketing materials list appropriate international access symbols and a statement regarding accessibility policies.",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Organization has reasonable advance notification policy for patrons interested in utilizing its programs and services (e.g. sign interpretation, large print programs, etc).",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "If organization has an advanced notification policy, please provide here.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Organization utilizes its ADA advisory board or similar representation to reach patrons with disabilities.",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Organization has developed or is planning to develop a targeted marketing approach to reach out to patrons with disabilities.",
    qtype: "text",
    options: [],
  },
  {
    section: "Marketing Practices",
    question:
      "Does your organization tour or use other facilities than those you own?",
    qtype: "radio",
    options: ["Yes", "No"],
  },

  //! ---------------------------------------- Check this qtype

  {
    section: "Marketing Practices",
    question:
      "If you provide a letter of agreement rider, or ADA checklist (see self-assessment survey tool appendix) to the landlord or manager of the venue in which the programming will take place, or if your services are contracted, presented, or part of a larger production/festival/exhibit, you are still responsible for advocating and requesting accessibility services for your artists and the patrons who will participate/view the performance/exhibit.",
    qtype: "",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Please describe the accessible route from public transportation to the facility.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If there is not an accessible route, please explain your goals for working with local/community officials to establish one in each of the following fiscal years.  ",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question: "Please describe available ADA compliant parking.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Please describe the accessible route from parking to primary accessible entrance.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If there is not an accessible route, please explain your goals for working with local/community officials to establish one in each of the following fiscal years.  ",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Please describe ADA compliant doors to entrance, bathrooms, assembly areas, gallery/display areas.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If your facility has multiple levels, please describe the availability of an elevator or interior ramps at level or floor changes.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Restrooms (or gender-inclusive bathroom) used by the public are ADA compliant.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Seating areas of facility have the correct percentage of wheelchair locations on each level as required by the law. Please include percentage of seats that are wheelchair accessible in your description.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Please describe ADA compliant signage in all facilities your maintain (performance, exhibit, classroom, office and rehearsal space), including Braille, font size, contrast, mounting, and height.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Please describe ADA compliant box office window or information desk.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question: "Please describe ADA compliant concession stand or gift shop.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Please describe ADA compliant performance/dressing room/artist space/classroom.",
    qtype: "multi-text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "If you do not offer this accommodation, please explain your goals for offering the accommodation in each of the following fiscal years.",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question:
      "Who in your organization is responsible for facility access oversight",
    qtype: "text",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question: "Has your organization budgeted for access capital needs?",
    qtype: "radio",
    options: ["Yes", "No"],
  },
  {
    section: "Accessible Facilities",
    question:
      "OPTIONAL: To help the Cultural Access Network Project establish an ongoing library of resources, we would like to collect photos and/or marketing materials related to your access programming.",
    qtype: "file",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question: "Upload additional photo here.",
    qtype: "file",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question: "Upload additional photo here.",
    qtype: "file",
    options: [],
  },
  {
    section: "Accessible Facilities",
    question: "Please enter the date on which you are submitting this form.",
    qtype: "text",
    options: [],
  },
];

module.exports = { seeds };
