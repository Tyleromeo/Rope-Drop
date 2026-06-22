// Rope Drop — Trivia
// A tiered, categorized trivia system. Players pick a category, then a
// difficulty level. Levels gate progressively — only a perfect score on
// a level unlocks the next one for that category. Each round draws 10
// random questions from a much larger pool per category/level, so repeat
// play rarely repeats the same set.

const TRIVIA_LEVELS = [
  { id: 1, label: 'Mouseketeer', sub: 'Easy' },
  { id: 2, label: 'Cast Member', sub: 'Medium' },
  { id: 3, label: 'Sorcerer', sub: 'Hard' },
  { id: 4, label: 'Imagineer', sub: 'Expert' },
];

const TRIVIA_CATEGORIES = {
  'sidekicks-villains': {
    label: 'Sidekicks & Villains',
    emoji: '🦹',
    levels: {
      1: [
        { q: "What is the name of Aladdin's pet sidekick monkey?", options: ['Iago', 'Abu', 'Rajah', 'Zazu'], correct: 1, explain: 'Abu is Aladdin\'s mischievous companion throughout the film, often getting them both into trouble.' },
        { q: 'Which sea witch steals Ariel\'s voice in The Little Mermaid?', options: ['Ursula', 'Maleficent', 'The Evil Queen', 'Mother Gothel'], correct: 0, explain: 'Ursula trades Ariel her voice for a chance at human legs, with predictably villainous strings attached.' },
        { q: "What is the name of Peter Pan's fairy sidekick?", options: ['Tinker Bell', 'Periwinkle', 'Silvermist', 'Rosetta'], correct: 0, explain: 'Tinker Bell is Peter Pan\'s loyal, jealous, and fiercely protective fairy companion.' },
        { q: 'Which villain wants to steal puppies for a fur coat?', options: ['Cruella de Vil', 'Ursula', 'Lady Tremaine', 'Yzma'], correct: 0, explain: '101 Dalmatians\' Cruella de Vil is obsessed with acquiring a coat made from dalmatian fur.' },
        { q: 'Which villain uses a magic mirror to ask who is fairest of all?', options: ['Maleficent', 'The Evil Queen', 'Lady Tremaine', 'Mother Gothel'], correct: 1, explain: 'The Evil Queen\'s vanity and jealousy of Snow White drive the entire plot.' },
        { q: 'What is the name of Hercules\' fiery underworld villain?', options: ['Hades', 'Scar', 'Chernabog', 'Jafar'], correct: 0, explain: 'Hades rules the underworld and schemes to overthrow Mount Olympus.' },
        { q: "Who is Simba's villainous uncle in The Lion King?", options: ['Scar', 'Zazu', 'Banzai', 'Mufasa'], correct: 0, explain: 'Scar murders his brother Mufasa and seizes the throne, blaming Simba for the death.' },
        { q: "What is the name of Mulan's tiny dragon sidekick?", options: ['Mushu', 'Maximus', 'Pascal', 'Heihei'], correct: 0, explain: 'Mushu is sent by Mulan\'s ancestors to guide and protect her.' },
        { q: 'Which villain commands a pirate ship and fears a ticking crocodile?', options: ['Captain Hook', 'Long John Silver', 'Barbossa', 'Davy Jones'], correct: 0, explain: 'Captain Hook lost his hand to a crocodile, who has been chasing him ever since.' },
        { q: 'Who is the main villain in The Incredibles?', options: ['Syndrome', 'Chick Hicks', 'Hopper', 'Randall'], correct: 0, explain: 'Syndrome is a former fan turned supervillain, bitter after being rejected by his childhood hero.' },
        { q: "What is the name of Rapunzel's chameleon sidekick?", options: ['Pascal', 'Mushu', 'Heihei', 'Flit'], correct: 0, explain: 'Pascal is Rapunzel\'s loyal companion throughout her tower years and beyond.' },
        { q: 'Who is the greedy corporate boss in Monsters, Inc.?', options: ['Henry J. Waternoose', 'Randall Boggs', 'Mr. Big', 'Charles Muntz'], correct: 0, explain: 'Waternoose secretly plots to kidnap children to solve the company\'s energy crisis.' },
        { q: 'Which villain curses Aurora to fall into a deep sleep?', options: ['Maleficent', 'Ursula', 'The Evil Queen', 'Yzma'], correct: 0, explain: 'Maleficent curses the infant princess after being snubbed from the royal christening.' },
        { q: "What is Gaston's sidekick's name?", options: ['LeFou', 'Lumiere', 'Cogsworth', 'Chip'], correct: 0, explain: 'LeFou follows Gaston everywhere, cheering on his every scheme.' },
        { q: 'Who is the villain in Toy Story 3 who rules Sunnyside Daycare?', options: ['Lotso', 'Stinky Pete', 'Sid Phillips', 'Al McWhiggin'], correct: 0, explain: 'Lotso seems friendly at first but runs the daycare with cruel control.' },
      ],
      2: [
        { q: "What is the name of Yzma's sidekick in The Emperor's New Groove?", options: ['Kronk', 'Pacha', 'Bucky', 'Rudy'], correct: 0, explain: 'Kronk is easily distracted and surprisingly good-hearted for a villain\'s henchman.' },
        { q: 'Which villain is a voodoo witch doctor known as the Shadow Man?', options: ['Dr. Facilier', 'Jafar', 'Hades', 'Chernabog'], correct: 0, explain: 'Dr. Facilier deals in dark magic throughout The Princess and the Frog.' },
        { q: "What are the names of Ursula's pet eels?", options: ['Flotsam and Jetsam', 'Pain and Panic', 'Si and Am', 'Heckle and Jeckle'], correct: 0, explain: 'Flotsam and Jetsam serve as Ursula\'s spies and enforcers.' },
        { q: 'Which villain hunts gorillas in Tarzan?', options: ['Clayton', 'Gaston', 'McLeach', 'Frollo'], correct: 0, explain: 'Clayton is a ruthless hunter who poses as an ally before his true motives surface.' },
        { q: "What is Jafar's pet parrot called?", options: ['Iago', 'Zazu', 'Scuttle', 'Heihei'], correct: 0, explain: 'Iago is a sarcastic, cracker-obsessed bird who serves as Jafar\'s sidekick.' },
        { q: 'Who is the head of the Hun army in Mulan?', options: ['Shan Yu', 'Li Shang', 'The Emperor', 'Chi Fu'], correct: 0, explain: 'Shan Yu leads the Hun invasion that Mulan must stop.' },
        { q: "What is Moana's pet rooster's name?", options: ['Heihei', 'Hei Hei the Second', 'Pua', 'Tamatoa'], correct: 0, explain: 'Heihei is comically dim-witted but tags along for the entire ocean voyage.' },
        { q: 'Who kidnaps Woody in Toy Story 2?', options: ['Al McWhiggin', 'Sid Phillips', 'Stinky Pete', 'Lotso'], correct: 0, explain: 'Al plans to sell Woody to a museum in Japan.' },
        { q: "What is Maleficent's pet raven called?", options: ['Diablo', 'Iago', 'Flotsam', 'Zazu'], correct: 0, explain: 'Diablo serves as Maleficent\'s loyal spy in Sleeping Beauty.' },
        { q: "Who rules the grasshoppers in A Bug's Life?", options: ['Hopper', 'Flik', 'P.T. Flea', 'Heimlich'], correct: 0, explain: 'Hopper terrorizes the ant colony, demanding tribute every season.' },
        { q: 'Which two hyenas follow Scar in The Lion King?', options: ['Banzai and Shenzi', 'Pain and Panic', 'Flotsam and Jetsam', 'Si and Am'], correct: 0, explain: 'Banzai and Shenzi form Scar\'s hyena pack in the Pride Lands.' },
        { q: "Who betray Flynn Rider in Tangled after a heist?", options: ['The Stabbington Brothers', 'Pain and Panic', 'Jasper and Horace', 'Si and Am'], correct: 0, explain: 'The Stabbington Brothers double-cross Flynn during the story.' },
        { q: 'Which villain is the corrupt judge in The Hunchback of Notre Dame?', options: ['Judge Claude Frollo', 'Clayton', 'Gaston', 'Shan Yu'], correct: 0, explain: 'Frollo abuses his power as both judge and Quasimodo\'s guardian.' },
        { q: "What is the name of Cinderella's villainous cat?", options: ['Lucifer', 'Si', 'Am', 'Gus'], correct: 0, explain: 'Lucifer torments Cinderella\'s mouse friends throughout the film.' },
        { q: 'Who is the puppet-master villain in Pinocchio?', options: ['Stromboli', 'The Coachman', 'Honest John', 'Monstro'], correct: 0, explain: 'Stromboli exploits Pinocchio as a marionette performer.' },
      ],
      3: [
        { q: "Who kills Bambi's mother?", options: ['Man (unnamed hunter)', 'Ronno', 'The Great Prince', 'A wolf'], correct: 0, explain: 'The hunter is never given a name in the film, referred to only as "Man."' },
        { q: 'Who are the two human henchmen who work for Cruella de Vil?', options: ['Jasper and Horace', 'Pain and Panic', 'Flotsam and Jetsam', 'Si and Am'], correct: 0, explain: 'Jasper and Horace are tasked with dognapping the puppies.' },
        { q: 'Which alien captain hunts Stitch across the galaxy?', options: ['Captain Gantu', 'Jumba', 'Pleakley', 'Dr. Hämsterviel'], correct: 0, explain: 'Gantu is sent to recapture Experiment 626 after Stitch escapes to Earth.' },
        { q: "What are the names of Hades' two demon sidekicks?", options: ['Pain and Panic', 'Si and Am', 'Flotsam and Jetsam', 'Banzai and Shenzi'], correct: 0, explain: 'Pain and Panic are shapeshifting minions who carry out Hades\' schemes.' },
        { q: 'Which puppet-master villain terrifies Pinocchio at his theater?', options: ['Stromboli', 'The Coachman', 'Monstro', 'Honest John'], correct: 0, explain: 'Stromboli locks Pinocchio in a cage once he realizes the puppet can move on its own.' },
        { q: "What is Lady Tremaine's cat called in Cinderella?", options: ['Lucifer', 'Si', 'Am', 'Bruno'], correct: 0, explain: 'Lucifer is Lady Tremaine\'s scheming, mouse-tormenting house cat.' },
        { q: 'Who is the secondary villain cat in The Great Mouse Detective?', options: ['Felicia', 'Lucifer', 'Si', 'Am'], correct: 0, explain: 'Felicia serves as Ratigan\'s pet and enforcer throughout the film.' },
        { q: 'What is the name of the corrupt judge who persecutes Quasimodo\'s people?', options: ['Judge Claude Frollo', 'Lord Farquaad', 'Gaston', 'Shan Yu'], correct: 0, explain: 'Frollo persecutes Romani people throughout Paris as a corrupt minister of justice.' },
        { q: 'Which villain is the corporate boss who plots to kidnap children in Monsters, Inc.?', options: ['Henry J. Waternoose', 'Randall Boggs', 'Roz', 'Mike Wazowski'], correct: 0, explain: 'Waternoose is willing to harm children to keep the company\'s energy supply flowing.' },
        { q: 'Which Toy Story 2 villain planned to sell a complete collection to a museum?', options: ['Al McWhiggin', 'Sid Phillips', 'Stinky Pete', 'Zurg'], correct: 0, explain: 'Al collects an entire vintage Woody\'s Roundup set, with Woody as the missing piece.' },
      ],
      4: [
        { q: "What was Walt Disney's first cartoon character, whose rights he lost in a contract dispute?", options: ['Oswald the Lucky Rabbit', 'Mortimer Mouse', 'Donald Duck', 'Goofy'], correct: 0, explain: 'A contract dispute with distributor Charles Mintz cost Disney the legal rights to Oswald in 1928.' },
        { q: 'Which film features the secondary villain Ratigan, voiced by Vincent Price?', options: ['The Great Mouse Detective', 'The Aristocats', 'Robin Hood', 'The Rescuers'], correct: 0, explain: 'Ratigan is a rat who insists on being called a mouse, opposing Basil throughout the mystery.' },
        { q: 'In Robin Hood, which snake assists Prince John using hypnosis?', options: ['Sir Hiss', 'Kaa', "Jafar's staff snake", 'Scar'], correct: 0, explain: 'Sir Hiss is Prince John\'s scheming advisor, often used to hypnotize King Richard.' },
        { q: 'What is the name of the multi-armed lava monster Moana must get past?', options: ['Te Kā', 'Tamatoa', 'Maui', 'Te Fiti'], correct: 0, explain: 'Te Kā guards the path to Te Fiti and battles Moana and Maui directly.' },
        { q: 'Which early Disney short film features a villainous, corrupt projectionist called The Mad Doctor?', options: ['The Mad Doctor (1933)', 'Steamboat Willie', 'Plane Crazy', "The Skeleton Dance"], correct: 0, explain: 'The Mad Doctor is one of Disney\'s earliest horror-tinged short film villains.' },
      ],
    }
  },
  'love-royalty': {
    label: 'Love & Royalty',
    emoji: '👑',
    levels: {
      1: [
        { q: 'Which princess has long, magical blonde hair?', options: ['Rapunzel', 'Aurora', 'Belle', 'Ariel'], correct: 0, explain: 'Rapunzel\'s hair holds magical healing powers, central to her entire story.' },
        { q: 'Which princess leaves the sea to marry Prince Eric?', options: ['Ariel', 'Aurora', 'Jasmine', 'Tiana'], correct: 0, explain: 'Ariel trades her voice for legs in hopes of joining Eric on land.' },
        { q: "Who is Aladdin's royal love interest?", options: ['Princess Jasmine', 'Princess Aurora', 'Princess Tiana', 'Mulan'], correct: 0, explain: 'Jasmine is the Sultan\'s daughter, set to be married off until Aladdin enters her life.' },
        { q: "What is the name of Cinderella's prince?", options: ['Prince Charming', 'Prince Eric', 'Prince Naveen', 'Prince Phillip'], correct: 0, explain: 'Cinderella\'s love interest is commonly referred to as Prince Charming.' },
        { q: 'Which princess falls for a prince cursed to look like a beast?', options: ['Belle', 'Aurora', 'Snow White', 'Rapunzel'], correct: 0, explain: 'Belle sees past the Beast\'s appearance and falls for who he truly is.' },
        { q: 'Who is the ice harvester who falls for Anna in Frozen?', options: ['Kristoff', 'Hans', 'Olaf', 'Sven'], correct: 0, explain: 'Kristoff helps Anna on her journey, and their bond grows along the way.' },
        { q: "Which princess is a skilled archer and Scottish king's daughter?", options: ['Merida', 'Mulan', 'Jasmine', 'Pocahontas'], correct: 0, explain: 'Merida defies traditional royal expectations, competing in her own archery contest.' },
        { q: 'Which princess dreams of opening a restaurant in New Orleans?', options: ['Tiana', 'Belle', 'Jasmine', 'Aurora'], correct: 0, explain: 'Tiana works tirelessly to save enough money to open her own restaurant.' },
        { q: 'Who is the lion king ruling the Pride Lands at the start of the film?', options: ['Mufasa', 'Scar', 'Simba', 'Zazu'], correct: 0, explain: 'Mufasa rules wisely before his death sets the plot of The Lion King into motion.' },
        { q: 'Which princess falls asleep after pricking her finger?', options: ['Aurora', 'Snow White', 'Belle', 'Cinderella'], correct: 0, explain: 'Aurora falls under Maleficent\'s curse on her 16th birthday.' },
      ],
      2: [
        { q: "What is the Beast's commonly used human name in Beauty and the Beast?", options: ['Prince Adam', 'Prince Charming', 'Prince Eric', 'Prince Naveen'], correct: 0, explain: 'The Beast is commonly referred to as Prince Adam, though the film never names him on screen.' },
        { q: "What is Tiana's love interest's name?", options: ['Prince Naveen', 'Prince Eric', 'Prince Adam', 'Flynn Rider'], correct: 0, explain: 'Prince Naveen of Maldonia is turned into a frog early in the story.' },
        { q: "What kingdom do Rapunzel's parents rule?", options: ['Corona', 'Arendelle', 'Agrabah', 'Maldonia'], correct: 0, explain: 'Corona is the kingdom Rapunzel was born into before being taken by Mother Gothel.' },
        { q: 'Which deceptive prince tricks Anna into a fake engagement?', options: ['Prince Hans', 'Kristoff', 'Olaf', 'Sven'], correct: 0, explain: 'Hans pretends to love Anna while secretly plotting to seize Arendelle\'s throne.' },
        { q: "What is Simba's childhood friend turned love interest called?", options: ['Nala', 'Sarabi', 'Sarafina', 'Zira'], correct: 0, explain: 'Nala grows up alongside Simba and later helps him reclaim his throne.' },
        { q: 'Who tries to force Belle into marriage?', options: ['Gaston', 'LeFou', 'The Beast', 'Maurice'], correct: 0, explain: 'Gaston is convinced Belle should marry him, despite her clear disinterest.' },
        { q: 'What human alias does Ursula use to pursue Eric?', options: ['Vanessa', 'Vivian', 'Veronica', 'Vera'], correct: 0, explain: 'Ursula disguises herself as Vanessa using Ariel\'s stolen voice.' },
        { q: "Who is Ariel's father, ruler of the sea?", options: ['King Triton', 'King Neptune', 'King Poseidon', 'King Atlantica'], correct: 0, explain: 'King Triton rules the underwater kingdom and is initially distrustful of humans.' },
        { q: "What is Merida's mother's name?", options: ['Queen Elinor', 'Queen Anna', 'Queen Clarion', 'Queen Iduna'], correct: 0, explain: 'Queen Elinor is accidentally turned into a bear for much of Brave\'s plot.' },
        { q: 'Where do Jasmine and the Sultan rule?', options: ['Agrabah', 'Arendelle', 'Corona', 'Motunui'], correct: 0, explain: 'Agrabah is the fictional desert kingdom where Aladdin takes place.' },
      ],
      3: [
        { q: "Which Disney princess is known for having famously few lines of spoken dialogue?", options: ['Aurora', 'Snow White', 'Cinderella', 'Jasmine'], correct: 0, explain: 'Sleeping Beauty\'s Aurora is asleep or absent for much of her own film, leaving her with very limited dialogue.' },
        { q: "What are Cinderella's two stepsisters named?", options: ['Anastasia and Drizella', 'Anastasia and Daphne', 'Drizella and Daphne', 'Anastasia and Lucinda'], correct: 0, explain: 'Anastasia and Drizella are Lady Tremaine\'s daughters and Cinderella\'s scheming stepsisters.' },
        { q: "What is Prince Eric's advisor's name?", options: ['Grimsby', 'Sebastian', 'Scuttle', 'Flounder'], correct: 0, explain: 'Grimsby serves as Eric\'s loyal royal advisor.' },
        { q: 'What ancient taboo prevents Moana from leaving her island?', options: ["Her father's law against crossing the reef", 'A royal decree', 'A magic curse', 'A storm warning'], correct: 0, explain: 'Chief Tui forbids anyone from sailing beyond the reef, a rule rooted in past tragedy.' },
        { q: "What are Ariel's six sisters' names?", options: ['Aquata, Andrina, Arista, Attina, Adella, and Alana', 'Just unnamed sisters', 'Aquata and Andrina only', 'They are not given names'], correct: 0, explain: 'All six of Ariel\'s older sisters are individually named in The Little Mermaid.' },
      ],
      4: [
        { q: "What is Ariel's mother's name, introduced in later Disney prequel media?", options: ['Queen Athena', 'Queen Marina', 'Queen Coral', 'Queen Calypso'], correct: 0, explain: 'Queen Athena is named in prequel material exploring King Triton\'s backstory.' },
        { q: "Who is Quasimodo's love interest in The Hunchback of Notre Dame?", options: ['Esmeralda', 'Belle', 'Megara', 'Jane'], correct: 0, explain: 'Esmeralda is a kind-hearted performer who befriends and is admired by Quasimodo.' },
      ],
    }
  },
  'who-said-it': {
    label: 'Who Said It?',
    emoji: '💬',
    levels: {
      1: [
        { q: '"To infinity and beyond!"', options: ['Buzz Lightyear', 'Woody', 'Rex', 'Mr. Potato Head'], correct: 0, explain: 'Buzz Lightyear\'s catchphrase from Toy Story became one of the most quoted lines in Pixar history.' },
        { q: '"Let it go, let it go!"', options: ['Elsa', 'Anna', 'Olaf', 'Kristoff'], correct: 0, explain: 'Elsa sings this as she embraces her ice powers and builds her ice palace.' },
        { q: '"Hakuna Matata!"', options: ['Timon and Pumbaa', 'Scar and Zazu', 'Simba and Nala', 'Rafiki'], correct: 0, explain: 'Timon and Pumbaa teach young Simba their carefree philosophy on life.' },
        { q: '"Just keep swimming."', options: ['Dory', 'Nemo', 'Marlin', 'Crush'], correct: 0, explain: 'Dory repeats this mantra to herself throughout Finding Nemo.' },
        { q: '"Ohana means family."', options: ['Stitch', 'Lilo', 'Nani', 'Jumba'], correct: 0, explain: 'The concept of ohana, or family, is central to the bond between Lilo and Stitch.' },
        { q: '"Mirror, mirror on the wall..."', options: ['The Evil Queen', 'Snow White', 'Lady Tremaine', 'Maleficent'], correct: 0, explain: 'The Evil Queen consults her magic mirror obsessively throughout Snow White.' },
        { q: '"A dream is a wish your heart makes."', options: ['Cinderella', 'Aurora', 'Snow White', 'Belle'], correct: 0, explain: 'This opens Cinderella\'s title song, setting the tone for the whole film.' },
        { q: '"The bare necessities of life."', options: ['Baloo', 'Mowgli', 'King Louie', 'Bagheera'], correct: 0, explain: 'Baloo teaches Mowgli his carefree philosophy on jungle living.' },
        { q: '"The cold never bothered me anyway."', options: ['Elsa', 'Anna', 'Olaf', 'Hans'], correct: 0, explain: 'Elsa closes "Let It Go" with this defiant line.' },
        { q: '"Some people are worth melting for."', options: ['Olaf', 'Sven', 'Kristoff', 'Anna'], correct: 0, explain: 'Olaf says this to Anna, showing his selfless loyalty despite being made of snow.' },
      ],
      2: [
        { q: '"The past can hurt. But you can either run from it or learn from it."', options: ['Rafiki', 'Mufasa', 'Zazu', 'Timon'], correct: 0, explain: 'Rafiki delivers this wisdom to help Simba confront his past.' },
        { q: '"Phenomenal cosmic powers, itty bitty living space."', options: ['Genie', 'Aladdin', 'Jafar', 'Iago'], correct: 0, explain: 'Genie jokes about the irony of his immense power confined to a small lamp.' },
        { q: '"If you focus on what you left behind, you will never be able to see what lies ahead."', options: ['Gusteau', 'Remy', 'Linguini', 'Anton Ego'], correct: 0, explain: 'Gusteau\'s philosophy guides Remy throughout Ratatouille, even after Gusteau\'s death.' },
        { q: '"Not everyone can become a great artist, but a great artist can come from anywhere."', options: ['Anton Ego', 'Gusteau', 'Skinner', 'Colette'], correct: 0, explain: 'The once-harsh critic Anton Ego delivers this line near the end of Ratatouille.' },
        { q: '"Our fate lives within us, you only have to be brave enough to see it."', options: ['Merida', 'Queen Elinor', 'King Fergus', 'The Witch'], correct: 0, explain: 'Merida reflects on choosing her own destiny throughout Brave.' },
        { q: '"I don\'t want to survive, I want to live."', options: ['Captain (WALL-E)', 'WALL-E', 'EVE', 'AUTO'], correct: 0, explain: 'The ship\'s captain says this as he rebels against a life of passive comfort aboard the Axiom.' },
        { q: '"Teenagers, they think they know everything."', options: ['Sebastian', 'King Triton', 'Flounder', 'Scuttle'], correct: 0, explain: 'Sebastian grumbles about Ariel\'s rebellious streak throughout the film.' },
        { q: '"Venture outside your comfort zone, the rewards are worth it."', options: ['Rapunzel', 'Flynn Rider', 'Mother Gothel', 'Pascal'], correct: 0, explain: 'Rapunzel reflects on stepping outside her tower for the first time.' },
        { q: '"Gaston, you are positively primeval."', options: ['Belle', 'Mrs. Potts', 'The Beast', 'LeFou'], correct: 0, explain: 'Belle delivers this sharp line in response to Gaston\'s advances.' },
        { q: '"In every job that must be done, there is an element of fun."', options: ['Mary Poppins', 'Bert', 'Mr. Banks', 'Jane Banks'], correct: 0, explain: 'Mary Poppins sings this during "A Spoonful of Sugar."' },
      ],
      3: [
        { q: '"You think the only people who are people are the people who look and think like you."', options: ['Pocahontas', 'John Smith', 'Chief Powhatan', 'Grandmother Willow'], correct: 0, explain: 'Pocahontas challenges John Smith\'s narrow worldview during "Colors of the Wind."' },
        { q: '"Far off places, daring sword fights, a prince in disguise."', options: ['Belle', 'The Beast', 'Gaston', 'Maurice'], correct: 0, explain: 'Belle describes her love of adventure stories early in Beauty and the Beast.' },
        { q: '"Giving up is for rookies."', options: ['Phil (Philoctetes)', 'Hercules', 'Hades', 'Zeus'], correct: 0, explain: 'Phil offers this gruff motivation while training Hercules.' },
        { q: '"If you keep on believing, the dream that you wish will come true."', options: ['Cinderella', 'The Fairy Godmother', 'Snow White', 'Aurora'], correct: 0, explain: 'This sentiment closes out Cinderella\'s title song.' },
      ],
      4: [
        { q: '"Do not be fooled by its commonplace appearance."', options: ["The Peddler (Aladdin's narrator)", 'The Genie', 'Jafar', 'The Sultan'], correct: 0, explain: 'The mysterious peddler narrates Aladdin\'s opening, foreshadowing the lamp\'s importance.' },
        { q: '"I am standard inspection model number... oh, what does it matter?"', options: ['B.E.N.', 'Dr. Delbert Doppler', 'John Silver', 'Captain Amelia'], correct: 0, explain: 'B.E.N. is a glitchy robot character voiced by Martin Short in Treasure Planet.' },
      ],
    }
  },
  'creatures-critters': {
    label: 'Creatures & Critters',
    emoji: '🐾',
    levels: {
      1: [
        { q: "What kind of animal is Mickey Mouse's dog Pluto?", options: ['A dog', 'A cat', 'A rabbit', 'A fox'], correct: 0, explain: 'Pluto is Mickey\'s loyal pet dog, distinct from Goofy, who is an anthropomorphic dog.' },
        { q: 'What kind of animal is Nemo?', options: ['A clownfish', 'A goldfish', 'A blue tang', 'An angelfish'], correct: 0, explain: 'Nemo is a young clownfish whose father searches the ocean to find him.' },
        { q: "What is Bambi's rabbit friend called?", options: ['Thumper', 'Flower', 'Faline', 'Friend Owl'], correct: 0, explain: 'Thumper is the energetic young rabbit who befriends Bambi early in the film.' },
        { q: 'What kind of animal is Timon in The Lion King?', options: ['A meerkat', 'A warthog', 'A mongoose', 'A weasel'], correct: 0, explain: 'Timon is a wisecracking meerkat who takes in young Simba.' },
        { q: 'What kind of animal is Pumbaa?', options: ['A warthog', 'A boar', 'A meerkat', 'A hippo'], correct: 0, explain: 'Pumbaa is the good-natured warthog who befriends Simba alongside Timon.' },
        { q: 'What kind of animal is Stitch disguised as on Earth?', options: ['A dog', 'A cat', 'A koala', 'A rabbit'], correct: 0, explain: 'Stitch is passed off as an unusual dog when adopted by Lilo\'s family.' },
        { q: 'What kind of animal is Baloo in The Jungle Book?', options: ['A bear', 'A tiger', 'An ape', 'A wolf'], correct: 0, explain: 'Baloo is a laid-back sloth bear who befriends and protects Mowgli.' },
        { q: "What is Ariel's crab friend's name?", options: ['Sebastian', 'Flounder', 'Scuttle', 'Flotsam'], correct: 0, explain: 'Sebastian is King Triton\'s court composer, tasked with keeping an eye on Ariel.' },
        { q: 'What kind of animal is Shere Khan?', options: ['A tiger', 'A lion', 'A leopard', 'A panther'], correct: 0, explain: 'Shere Khan is the menacing tiger who serves as the primary threat in The Jungle Book.' },
        { q: 'What kind of animal is Flower in Bambi?', options: ['A skunk', 'A rabbit', 'A deer', 'An owl'], correct: 0, explain: 'Flower is a shy young skunk who befriends Bambi and Thumper.' },
      ],
      2: [
        { q: "What is Ariel's fish friend called?", options: ['Flounder', 'Sebastian', 'Scuttle', 'Triton'], correct: 0, explain: 'Flounder is Ariel\'s loyal, somewhat anxious fish companion.' },
        { q: 'What kind of animal is Remy in Ratatouille?', options: ['A rat', 'A mouse', 'A raccoon', 'A squirrel'], correct: 0, explain: 'Remy is a rat with an extraordinary sense of taste and a passion for cooking.' },
        { q: 'What is the name of the wise sea turtle in Finding Nemo?', options: ['Crush', 'Squirt', 'Dory', 'Bruce'], correct: 0, explain: 'Crush guides Marlin and Dory across the East Australian Current.' },
        { q: 'What kind of creature is Pegasus in Hercules?', options: ['A winged horse', 'A flying lion', 'A griffin', 'A phoenix'], correct: 0, explain: 'Pegasus is Hercules\' loyal winged horse companion.' },
        { q: 'What kind of snake is Kaa in The Jungle Book?', options: ['A rock python', 'A cobra', 'A boa constrictor', 'A viper'], correct: 0, explain: 'Kaa tries to hypnotize and eat Mowgli using his swirling eyes.' },
        { q: "What is Cinderella's main mouse friend called?", options: ['Gus (Gus-Gus)', 'Jaq', 'Timothy', 'Bruno'], correct: 0, explain: 'Gus is the plump, kind-hearted mouse who helps make Cinderella\'s dress.' },
        { q: 'What kind of animal is Randall in Monsters, Inc.?', options: ['A chameleon-like monster', 'A spider monster', 'A serpent monster', 'A bat monster'], correct: 0, explain: 'Randall can blend into his surroundings, making him a sneaky rival to Sulley.' },
        { q: 'What kind of animal is Judy Hopps in Zootopia?', options: ['A rabbit', 'A fox', 'A sheep', 'A cheetah'], correct: 0, explain: 'Judy is the first rabbit to become a police officer in Zootopia.' },
        { q: 'What kind of animal is Nick Wilde in Zootopia?', options: ['A fox', 'A wolf', 'A coyote', 'A raccoon'], correct: 0, explain: 'Nick is a sly con-artist fox who partners with Judy to solve a mystery.' },
        { q: 'What is the abominable snow monster Elsa creates called?', options: ['Marshmallow', 'Olaf', 'Sven', 'Bruni'], correct: 0, explain: 'Marshmallow guards Elsa\'s ice palace, created from her own powers.' },
      ],
      3: [
        { q: 'What are the two Siamese cats called in Lady and the Tramp?', options: ['Si and Am', 'Jaq and Gus', 'Flotsam and Jetsam', 'Pain and Panic'], correct: 0, explain: 'Si and Am cause chaos in the household, framing Lady for their own mess.' },
        { q: "What is the name of the green caterpillar who wants to become a butterfly in A Bug's Life?", options: ['Heimlich', 'Flik', 'P.T. Flea', 'Slim'], correct: 0, explain: 'Heimlich dreams of transforming into a beautiful butterfly throughout the film.' },
        { q: 'What are the two mice in The Rescuers called?', options: ['Bernard and Miss Bianca', 'Jaq and Gus', 'Mickey and Minnie', 'Basil and Dawson'], correct: 0, explain: 'Bernard and Miss Bianca are members of the Rescue Aid Society.' },
        { q: 'What kind of bird is Scuttle in The Little Mermaid?', options: ['A seagull', 'A pelican', 'An albatross', 'A heron'], correct: 0, explain: 'Scuttle is Ariel\'s self-proclaimed expert on human artifacts.' },
      ],
      4: [
        { q: 'What breed of dog is Nana in Peter Pan?', options: ['Newfoundland', 'Saint Bernard', 'Great Dane', 'Mastiff'], correct: 0, explain: 'Nana serves as the Darling children\'s nursemaid, a gentle Newfoundland.' },
        { q: "What is Tarzan's gorilla friend Terk's fuller name?", options: ['Terkington', 'Terkina', 'Terkella', 'Terkana'], correct: 0, explain: 'Terk is referred to by the fuller name "Terkington" in some expanded material.' },
      ],
    }
  },
};

function getAllCategoryQuestions() {
  const all = [];
  Object.values(TRIVIA_CATEGORIES).forEach(cat => {
    Object.values(cat.levels).forEach(qs => all.push(...qs));
  });
  return all;
}

// ── General Disney trivia (used by the "General Disney Trivia" quick mode) ──
const TRIVIA_GENERAL = [
  { q: 'How many "happy haunts" are said to live in the Haunted Mansion?', options: ['666', '999', '1,000', '1,313'], correct: 1, explain: 'The ghost host always claims you\'re the "1,000th" guest — leaving room for exactly 999 haunts already inside.' },
  { q: 'What does EPCOT stand for?', options: ['Educational Park for Cultural Outreach Today', 'Experimental Prototype Community of Tomorrow', 'European Pavilion Center of Technology', 'Epic Park Created of Tomorrow'], correct: 1, explain: 'EPCOT began as Walt Disney\'s concept for a planned community before evolving into the park celebrating innovation and world culture.' },
  { q: 'How many theme parks make up Walt Disney World?', options: ['Two', 'Three', 'Four', 'Five'], correct: 2, explain: 'Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom make up the four gated theme parks.' },
  { q: 'What was Mickey Mouse originally going to be named?', options: ['Morty', 'Mortimer', 'Marvin', 'Milton'], correct: 1, explain: 'Walt Disney\'s wife Lillian reportedly convinced him "Mortimer Mouse" didn\'t have the right ring to it.' },
  { q: 'What is the secret underground network beneath Magic Kingdom called?', options: ['The Underground', 'The Utilidors', 'The Tunnels', 'The Substreet'], correct: 1, explain: 'Utilidors let cast members move between lands without walking through the park in costume.' },
  { q: 'Which fictional secret society ties together Jungle Cruise, Big Thunder Mountain, and Tower of Terror lore?', options: ['S.E.A. (Society of Explorers and Adventurers)', 'The Adventurers Club', 'The Imagineers Guild', 'The Order of the Compass'], correct: 0, explain: 'S.E.A. connects the backstories of attractions across nearly every Disney park worldwide.' },
  { q: 'What animal can be found inside the Tree of Life carvings at Animal Kingdom?', options: ['Just elephants', 'Over 300 different animal carvings', 'Only African animals', 'No animals, just patterns'], correct: 1, explain: 'The Tree of Life features more than 300 intricately carved animals.' },
  { q: "What's the name of the geodesic sphere that EPCOT's Spaceship Earth ride is built inside?", options: ['The Golf Ball', 'Spaceship Earth (the building itself)', 'The Dome', 'The Orb'], correct: 1, explain: 'The building and the ride share the same name, even though fans nickname the sphere "the golf ball."' },
  { q: 'What term do Disney employees who design rides and attractions go by?', options: ['Designers', 'Architects', 'Imagineers', 'Creators'], correct: 2, explain: 'Imagineering blends "imagination" and "engineering."' },
  { q: 'What is a Disney park employee officially called?', options: ['Associate', 'Cast Member', 'Team Member', 'Crew Member'], correct: 1, explain: 'Every employee is referred to as a "Cast Member," reinforcing the idea that the park is one big show.' },
  { q: 'Which classic ride closed in 2023 to make way for Tiana\'s Bayou Adventure?', options: ['Pirates of the Caribbean', 'Splash Mountain', 'Big Thunder Mountain', "It's a Small World"], correct: 1, explain: 'Splash Mountain\'s ride track and drop stayed the same — only the theming changed.' },
  { q: 'What hidden shape do Imagineers love to sneak into park designs?', options: ['A star', "Mickey's silhouette (Hidden Mickey)", 'A castle outline', 'A pumpkin'], correct: 1, explain: 'Hidden Mickeys are tucked into rides, restaurants, and pavement throughout Disney parks.' },
  { q: 'What candy is famously NOT sold anywhere in Disney parks?', options: ['Chocolate bars', 'Gum', 'Lollipops', 'Caramel apples'], correct: 1, explain: 'Disney has avoided selling gum for decades, largely to avoid cleanup headaches.' },
  { q: "Which 1928 short film marked Mickey Mouse's breakout debut?", options: ['Plane Crazy', 'Steamboat Willie', "The Gallopin' Gaucho", "Mickey's Follies"], correct: 1, explain: 'Steamboat Willie was the first Mickey cartoon released with synchronized sound.' },
  { q: "What is the maximum possible score on Buzz Lightyear's Space Ranger Spin?", options: ['99,999', '500,000', '999,999', 'There is no maximum'], correct: 2, explain: 'Hitting every high-value target without missing can push your score to 999,999.' },
  { q: 'What was the very first Disney theme park, and when did it open?', options: ['Disneyland, 1955', 'Magic Kingdom, 1971', 'EPCOT, 1982', 'Disneyland, 1971'], correct: 0, explain: 'Disneyland opened July 17, 1955, the only park Walt Disney personally oversaw construction of.' },
  { q: 'What real Hollywood movie theater inspired the design of Carthay Circle Restaurant at DCA?', options: ['The Carthay Circle Theatre', "Grauman's Chinese Theatre", 'The El Capitan Theatre', 'The Pantages Theatre'], correct: 0, explain: 'The original Carthay Circle Theatre hosted the 1937 premiere of Snow White and the Seven Dwarfs.' },
  { q: 'What classic Tomorrowland attraction shows a family through changing decades of American home life?', options: ["Walt Disney's Carousel of Progress", 'The PeopleMover', 'Space Mountain', 'Astro Orbiter'], correct: 0, explain: 'Carousel of Progress rotates guests around a fixed stage following one family through generations.' },
];

const TRIVIA_BY_PARK = {
  mk: [
    { q: 'How many attractions did Magic Kingdom open with on October 1, 1971?', options: ['12', '18', '23', '30'], correct: 2, explain: 'Magic Kingdom opened with 23 attractions, including Haunted Mansion and It\'s a Small World.' },
    { q: 'Which statue stands directly in front of Cinderella Castle?', options: ['The Sharing the Magic statue', 'The Partners statue', 'The Spirit of America statue', 'The Storyteller statue'], correct: 1, explain: 'The Partners statue depicts Walt Disney holding hands with Mickey Mouse.' },
    { q: 'What is the height requirement for TRON Lightcycle / Run?', options: ['38 inches', '40 inches', '44 inches', '48 inches'], correct: 3, explain: 'At 48 inches, TRON has one of the higher height requirements in the park.' },
    { q: 'What classic attraction did The Many Adventures of Winnie the Pooh replace in 1999?', options: ["Snow White's Scary Adventures", "Mr. Toad's Wild Ride", '20,000 Leagues Under the Sea', 'The Skyway'], correct: 1, explain: 'A small statue honoring Mr. Toad is hidden in the queue of Winnie the Pooh.' },
    { q: 'What new feature did Big Thunder Mountain Railroad gain in its 2026 refurbishment?', options: ['A loop', 'A lower height requirement', 'Indoor-only track', 'A second train track'], correct: 1, explain: 'The height requirement dropped from 40 to 38 inches as part of the 2026 refresh.' },
    { q: "What fictional secret society appears in Big Thunder Mountain's queue backstory?", options: ['S.E.A.', 'The Adventurers Club', 'The Explorers Guild', 'WED Enterprises'], correct: 0, explain: 'Big Thunder Mining Company owner Barnabas T. Bullion is tied into S.E.A. lore.' },
  ],
  ep: [
    { q: 'What ride did Frozen Ever After replace inside the Norway pavilion?', options: ['Gran Fiesta Tour', 'Maelstrom', 'Spaceship Earth', 'Living with the Land'], correct: 1, explain: 'A few Norwegian troll statues from the original Maelstrom ride are still hidden in the queue today.' },
    { q: "How many countries are represented in EPCOT's World Showcase?", options: ['9', '11', '14', '18'], correct: 1, explain: 'World Showcase features 11 country pavilions arranged in a loop around the lagoon.' },
    { q: "What's unique about the ride vehicles on Guardians of the Galaxy: Cosmic Rewind?", options: ['They go underwater', 'They rotate to face the action', 'They are open-air only', 'They are operated by guests'], correct: 1, explain: 'It\'s Disney\'s first rotating-vehicle roller coaster.' },
    { q: 'How many possible songs can play during your ride on Cosmic Rewind?', options: ['Just 1', '3', '6', '12'], correct: 2, explain: 'Six classic rock songs are in rotation.' },
    { q: "Which EPCOT pavilion houses Soarin'?", options: ['The Land', 'The Seas with Nemo & Friends', 'World Discovery', 'Journey Into Imagination'], correct: 0, explain: 'The Land pavilion is the largest in EPCOT.' },
  ],
  hs: [
    { q: "What land did Star Wars: Galaxy's Edge bring to Hollywood Studios?", options: ['Tatooine', 'Batuu', 'Endor', 'Jakku'], correct: 1, explain: 'Black Spire Outpost on the planet Batuu is the setting for the entire land.' },
    { q: "What ride system does Rise of the Resistance share with Remy's Ratatouille Adventure?", options: ['Trackless ride vehicles', 'Roller coaster track', 'Boat-based ride system', 'Dark ride omnimover'], correct: 0, explain: 'Both rides use trackless vehicle technology.' },
    { q: "How fast does Rock 'n' Roller Coaster launch riders in under 3 seconds?", options: ['0 to 35 mph', '0 to 45 mph', '0 to 57 mph', '0 to 70 mph'], correct: 2, explain: 'The launch accelerates riders to nearly 60 mph almost instantly.' },
    { q: 'Which classic show did Disney Jr. Mickey Mouse Clubhouse Live! replace in the Hyperion Theater?', options: ['Disney Junior Dance Party', 'Beauty and the Beast Live', 'Fantasmic!', 'Frozen Sing-Along'], correct: 0, explain: 'The new show opened May 16, 2025.' },
  ],
  ak: [
    { q: 'How many animal carvings are featured on the Tree of Life?', options: ['About 50', 'About 150', 'Over 300', 'Over 1,000'], correct: 2, explain: 'More than 300 detailed animal carvings spiral around the massive tree.' },
    { q: 'What mythical creature is themed throughout Expedition Everest?', options: ['Dragon', 'Yeti', 'Phoenix', 'Griffin'], correct: 1, explain: 'The Yeti figure inside the mountain is one of the largest Audio-Animatronics figures Disney has built.' },
    { q: "What show replaced It's Tough to Be a Bug! in the Tree of Life Theater?", options: ['Zootopia: Better Zoogether!', 'Finding Nemo: The Musical', 'Festival of the Lion King', 'Rivers of Light'], correct: 0, explain: 'Zootopia: Better Zoogether! opened in the same theater in November 2025.' },
    { q: 'Which ride lets you spot real, living animals along the route?', options: ['DINOSAUR', 'Kilimanjaro Safaris', "Na'vi River Journey", 'Expedition Everest'], correct: 1, explain: 'Kilimanjaro Safaris drives guests through a real, expansive savanna habitat.' },
  ],
  dl: [
    { q: 'In what year did the original Disneyland open?', options: ['1950', '1955', '1961', '1971'], correct: 1, explain: 'Disneyland opened on July 17, 1955, in Anaheim, California.' },
    { q: "What's the name of the castle at the center of Disneyland?", options: ['Cinderella Castle', 'Sleeping Beauty Castle', "Beast's Castle", "Snow White's Castle"], correct: 1, explain: 'Sleeping Beauty Castle is the original Disney park centerpiece.' },
    { q: 'What was Critter Country renamed to in 2024?', options: ['Bayou Country', 'Bear Country', 'Adventure Bayou', "Tiana's Territory"], correct: 0, explain: "The land became Bayou Country alongside the debut of Tiana's Bayou Adventure." },
  ],
  dca: [
    { q: "What real California road trip route inspired Cars Land's design?", options: ['Route 66', 'Pacific Coast Highway', 'Highway 1', 'The Pan-American Highway'], correct: 0, explain: "Cars Land's Radiator Springs is themed after classic Route 66 roadside towns." },
    { q: 'What Marvel-themed land opened at DCA in 2021?', options: ['Stark Tower', 'Avengers Campus', 'S.H.I.E.L.D. Base', 'X-Mansion'], correct: 1, explain: "Avengers Campus replaced part of the former A Bug's Land." },
    { q: 'What films does the current World of Color – Happiness! show feature?', options: ['Encanto, Turning Red, and Inside Out', 'Frozen and Moana', 'Coco and The Book of Life', 'Up and Soul'], correct: 0, explain: "The current version ties into the resort's 70th anniversary celebration." },
  ],
};
