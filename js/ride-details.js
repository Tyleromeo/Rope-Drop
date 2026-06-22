// Rope Drop — Ride Details
// Extra info shown when a person taps to expand a ride: a short description
// of what it actually is, a practical tip, and a fun fact. Not every ride
// has an entry yet — coverage expands over time. Content is written in
// original phrasing, not copied from any single source.

const RIDE_DETAILS = {
  // ── Magic Kingdom ──
  'mk-01': {
    description: 'A family-friendly mine cart coaster through the Seven Dwarfs\' jewel mine. Your cart swings side to side around the turns — no loops or big drops, just a lively, twisty ride with great theming.',
    tip: 'One of the most popular rides in the whole resort. Ride first thing at rope drop or grab a paid Lightning Lane — waits regularly climb past 60–90 minutes by midday.',
    funFact: 'Several animatronic figures inside, including the Evil Queen and some of the dwarfs, were reused from the older Snow White\'s Scary Adventures ride that the mine train replaced in 2014.'
  },
  'mk-02': {
    description: 'A slow-moving "doom buggy" ride through a haunted mansion full of ghosts, holograms, and classic Disney special effects. Spooky but not scary — built for all ages.',
    tip: 'Waits stay fairly manageable most of the day since the ride moves a large number of guests continuously. Evenings add a nice atmosphere if you don\'t mind the dark.',
    funFact: 'The 999 "happy haunts" mentioned by the ghost host are a running joke — guests are always told they\'re the 1,000th guest, needed to complete the mansion\'s haunting.'
  },
  'mk-03': {
    description: 'A boat ride through scenes of pirates raiding a Caribbean town, complete with cannon fire, treasure, and a memorable drop near the start.',
    tip: 'A great rainy-day ride since most of it is indoors. The drop near the beginning catches new riders off guard — nothing major, but worth knowing.',
    funFact: 'Walt Disney personally oversaw the original 1967 Disneyland version — it was the last ride he helped design before he passed away.'
  },
  'mk-04': {
    description: 'An indoor space-themed roller coaster that runs almost entirely in the dark, so you can\'t see the turns and drops coming.',
    tip: 'The mostly-dark ride makes it feel faster and more intense than its actual top speed. Request the back row at the loading area for a slightly wilder ride.',
    funFact: 'Despite feeling like a fast, modern coaster, the core ride system dates back to 1975 — making it one of the older attractions still running daily.'
  },
  'mk-05': {
    description: 'A runaway mine train coaster that winds through a crumbling Western mining town, complete with flash floods, falling rocks, and an earthquake.',
    tip: 'Genuinely more fun after dark — the lighting and effects land differently at night. Daytime waits are usually shorter than its Fantasyland neighbors.',
    funFact: 'The mountain itself is built from a mix of real and fabricated rock, and several of the "abandoned" mining props were sourced from actual decommissioned mines out west.'
  },
  'mk-06': {
    description: 'A slow boat cruise through dozens of scenes of singing, dancing dolls representing cultures from around the world — all set to the same earworm song.',
    tip: 'Calm, indoor, and air-conditioned, making it a reliable choice to cool off during the hottest part of the day.',
    funFact: 'The song "It\'s a Small World (After All)" was written specifically for this ride\'s 1964 World\'s Fair debut and has been translated and looped in nearly every Disney park worldwide since.'
  },
  'mk-08': {
    description: 'A boat cruise past animatronic animals and ruins, narrated by a deliberately corny skipper delivering puns the whole way.',
    tip: 'The jokes are the main draw, so if your skipper seems extra enthusiastic, lean into it — cast members are encouraged to riff and improvise.',
    funFact: 'The "backside of water" gag, where the boat passes a waterfall labeled with that exact phrase, has been a running joke in the ride since the 1990s.'
  },
  'mk-09': {
    description: 'A gentle "hunny pot" ride through scenes from the Winnie the Pooh stories, complete with a bouncy Heffalumps-and-Woozles dream sequence.',
    tip: 'Great choice for very young kids or anyone wanting a slow, sweet ride with no height requirement and minimal wait most of the day.',
    funFact: 'It replaced the much-loved Mr. Toad\'s Wild Ride in 1999, and a small statue honoring Mr. Toad is hidden in the queue as a nod to the original attraction.'
  },
  'mk-12': {
    description: 'A "clamshell" ride that glides past scenes from The Little Mermaid, finishing with a big under-the-sea wedding celebration.',
    tip: 'A calm, low-key ride with usually short lines — a good one to slot in between bigger attractions without losing much time.',
    funFact: 'The ride uses the Doom Buggy-style omnimover system, the same ride technology that powers Haunted Mansion, just reskinned as glowing clamshells.'
  },
  // ── EPCOT ──
  'ep-01': {
    description: 'An indoor coaster that launches backward into a starfield before spinning your vehicle to face whichever direction the action is happening — including a randomized in-ride soundtrack.',
    tip: 'One of the newest and most popular rides at EPCOT. Lightning Lane sells out fast, so grab it early in the day if you want to skip the standby line.',
    funFact: 'It\'s the first Disney ride with a rotating vehicle on a roller coaster track, and each ride plays one of six possible classic rock songs at random.'
  },
  'ep-02': {
    description: 'A trackless ride that shrinks you down to rat-size and races you through Gusteau\'s restaurant kitchen from the movie Ratatouille.',
    tip: 'Extremely popular with younger kids and a relatively new addition to World Showcase. Ride early or use Lightning Lane — waits build fast after opening.',
    funFact: 'The ride uses the same trackless vehicle technology as Star Wars: Rise of the Resistance, letting each car move independently instead of following a fixed rail.'
  },
  'ep-03': {
    description: 'A boat ride through scenes from Frozen, finishing with a backward plunge down a "waterfall" that\'s really a ride drop in disguise.',
    tip: 'Located inside the Norway pavilion. The backward drop at the end is brief and gentle, but surprises plenty of first-time riders.',
    funFact: 'It replaced the long-running Maelstrom ride, and a few small Norwegian troll statues from the original attraction are still hidden in the queue.'
  },
  'ep-04': {
    description: 'A hang-gliding simulator that lifts your seats into the air to "soar" over famous landmarks around the world on a giant projection screen.',
    tip: 'Sit in the front row for the best unobstructed view of the screen. The motion is gentle, making it a good pick for nervous riders.',
    funFact: 'The ride uses subtle scent effects timed to the visuals — you can genuinely smell orange groves and pine forest during certain scenes.'
  },
  'ep-05': {
    description: 'A motion-simulator ride that puts you through a fast, twisty test course in a virtual concept car, with a real outdoor loop at the end.',
    tip: 'Choose the calmer "Test Track Presented by Chevrolet" experience if you\'re sensitive to sudden motion — it\'s still a fun ride without as much jostling.',
    funFact: 'The track design loosely mimics a real automotive proving ground, including simulated brake tests, hairpin turns, and a hill climb before the high-speed outdoor finale.'
  },
};
