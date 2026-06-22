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
    tip: 'Reopened in May 2026 after a 16-month refurbishment with a refreshed cavern scene and a lower height requirement — genuinely more fun after dark when the new lighting effects really pop.',
    funFact: 'The 2026 refresh lowered the minimum height to 38" (down from 40"), and the overhauled Rainbow Caverns scene now features more than 2,000 animated bats.'
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
  // ── Magic Kingdom (additional) ──
  'mk-07': {
    description: 'A spinning dark ride where you and a riding partner aim laser blasters at targets while battling the Evil Emperor Zurg alongside Buzz Lightyear.',
    tip: 'Twist the handle on your ride vehicle to spin and line up better shots — most riders never realize the car rotates on its own axis.',
    funFact: 'A 2025 refresh added a new robot character named Buddy and onboard score monitors, plus a handful of secret high-value targets that longtime fans still hunt for.'
  },
  'mk-10': {
    description: 'A classic spinning ride where each guest controls their own flying elephant, raising and lowering it by hand as the ride circles around.',
    tip: 'Capacity is higher than its Tomorrowland cousins (Astro Orbiter, Magic Carpets), so lines tend to move a bit faster — still worth doing early if you have young kids.',
    funFact: 'Magic Kingdom actually runs two nearly identical Dumbo circles side by side to handle the demand, a setup unique to this park among the Disney resorts.'
  },
  'mk-11': {
    description: 'A gas-powered go-kart ride that follows a fixed track around a winding Tomorrowland course — kids old enough can "drive" the car themselves.',
    tip: 'The slow loading process means posted wait times often undersell how long you\'ll actually stand in line — it\'s usually a lower priority unless your kids are dying to drive.',
    funFact: 'The cars are real gas-powered vehicles guided by a center rail, not pure simulators — meaning you can genuinely smell the exhaust as they idle in the queue.'
  },
  'mk-13': {
    description: 'A high-speed indoor coaster where you straddle a motorcycle-style Lightcycle and race through a glowing digital world inspired by the TRON films.',
    tip: 'The ride is intense but very short — if the standby line is over an hour, a Lightning Lane Single Pass is usually worth buying since the experience itself lasts under two minutes.',
    funFact: 'It launches you through an iconic glowing canopy visible from much of Tomorrowland before plunging into a fully dark indoor section for the bulk of the ride.'
  },
  'mk-14': {
    description: 'A log flume coaster that recently swapped its Br\'er Rabbit theming for a Princess and the Frog retheme, complete with a steep plunge near the end.',
    tip: 'You will get wet, especially in the front row — if you\'re trying to stay dry for the rest of the day, sit toward the back or bring a poncho.',
    funFact: 'The ride track and overall layout are unchanged from the original Splash Mountain — only the scenes, music, and characters were swapped during the retheme.'
  },
  'mk-19': {
    description: 'A simple, classic walk-up meet and greet with Mickey and Minnie inside a small theater near the train station on Main Street.',
    tip: 'Lightning Lane is usually overkill here — standby moves quickly most of the day since the meet-and-greet itself is brief.',
    funFact: 'This spot once hosted the long-running Township Photography Studio, and parts of its old-timey set dressing were preserved when it became a meet-and-greet location.'
  },
  'mk-20': {
    description: 'A character meet-and-greet hall in Fantasyland where you can meet rotating Disney princesses in individual themed rooms.',
    tip: 'Lines build fast after opening since this is one of the few air-conditioned indoor character experiences — go early or use Lightning Lane if it\'s a priority.',
    funFact: 'Each princess has her own dedicated room designed to match her film, so Cinderella\'s space looks nothing like the room you\'ll find Tiana or Rapunzel in.'
  },
  'mk-22': {
    description: 'Not a ride — a walk-up snack stand in Adventureland serving the pineapple-soft-serve treat practically every Disney World guest has heard of.',
    tip: 'Lines move fast even when they look long, since it\'s a simple grab-and-go item. Worth the short wait at least once per trip.',
    funFact: 'Dole Whip has no dairy in its original pineapple form, making it one of the few classic Disney snacks that\'s naturally vegan.'
  },
  'mk-15': {
    description: 'An afternoon parade through the park featuring elaborate floats themed to Disney stories, with a giant fire-breathing Maleficent dragon as the showstopping finale.',
    tip: 'Crowds start staking out spots 30–60 minutes early. Frontierland and Liberty Square tend to be less packed than the hub if you don\'t mind a slightly less central view.',
    funFact: 'The Maleficent dragon float is one of the largest and most complex parade floats ever built for the park, with a tail that sways and smoke effects timed to the music.'
  },
  'mk-16': {
    description: 'The park\'s nighttime fireworks show over Cinderella Castle, combining pyrotechnics, music, and projections across the castle façade.',
    tip: 'Arrive 45–60 minutes early for a good hub view on busy nights, or watch from Main Street for a more relaxed (if slightly more distant) vantage point.',
    funFact: 'The castle itself becomes a projection screen during the show, with imagery mapped precisely onto its turrets and towers in sync with the soundtrack.'
  },
  'mk-17': {
    description: 'A 4D theater show where Donald Duck accidentally steals Mickey\'s sorcerer hat and gets pulled through scenes from classic Disney movies, complete with in-theater wind, mist, and scent effects.',
    tip: 'The theater seats nearly 500 people and cycles every 12 minutes, so waits rarely top one show — a reliable way to cool off and rest your feet midday.',
    funFact: 'The screen is 150 feet wide, making it one of the largest purpose-built 3D screens ever installed in a theme park theater.'
  },
  'mk-18': {
    description: 'A short, high-energy dance party that pops up on Main Street with Disney characters and a DJ, more of a spontaneous celebration than a formal parade.',
    tip: 'Catch it on your way past Main Street rather than planning a special trip — it\'s brief and casual, not worth rearranging your day around.',
    funFact: 'Unlike Magic Kingdom\'s scheduled parades, this street party rotates characters and music periodically, so it can look different from one visit to the next.'
  },
  'mk-21': {
    description: 'A character meet-and-greet hall in Fantasyland where you can meet rotating Disney princesses in individual themed rooms.',
    tip: 'Lines build fast after opening since this is one of the few air-conditioned indoor character experiences — go early or use Lightning Lane if it\'s a priority.',
    funFact: 'Each princess has her own dedicated room designed to match her film, so Cinderella\'s space looks nothing like the room you\'ll find Tiana or Rapunzel in.'
  },
  'mk-23': {
    description: 'A table-service restaurant inside Beast\'s castle, themed to Beauty and the Beast, serving French-inspired dishes in three distinct dining rooms.',
    tip: 'Reservations book up months in advance — if you can\'t get one, walk-ups occasionally get seated during slow periods, especially for lunch.',
    funFact: 'The dessert menu includes "The Grey Stuff," a direct callback to the line from the movie\'s title song — and yes, it really is delicious, despite what the song says.'
  },
  'mk-24': {
    description: 'A classic Disney World snack — a smoked, oversized turkey leg sold from carts scattered around the park, no ride or show attached.',
    tip: 'It\'s a genuinely big portion, easily shareable between two people if you don\'t want to commit to the whole thing solo.',
    funFact: 'Turkey legs have been a Disney park staple since the 1990s and remain one of the most-photographed snacks in the entire resort, despite never appearing in any official menu campaign.'
  },
  'mk-25': {
    description: 'A baseball-themed quick-service spot on Main Street known for hot dogs, corn dogs, and loaded fries.',
    tip: 'A solid late-night option since it stays open near closing — convenient if you want a bite right before fireworks or on your way out of the park.',
    funFact: 'The restaurant is named and themed after Casey at the Bat, the classic baseball poem, tying into Main Street\'s overall early-1900s Americana theme.'
  },
  'mk-26': {
    description: 'A Liberty Square counter-service stop known for sweet and savory waffle creations, including seasonal pumpkin and funnel cake variations.',
    tip: 'The seasonal specials (especially around Halloween) tend to be the standout menu items — check what\'s currently offered before defaulting to the classic options.',
    funFact: 'Over the years the menu has cycled through several waffle and funnel cake combinations, with fans online tracking and ranking each version as it comes and goes.'
  },
  'mk-46': {
    description: 'A flying-galleon dark ride that lifts you over a miniature, glowing London skyline and into Neverland, retracing scenes from the Peter Pan story.',
    tip: 'No height requirement, but waits routinely run 40+ minutes since the ride loads slowly — a Lightning Lane Multi Pass pick is genuinely worth using here.',
    funFact: 'The flying-ship effect is created with overhead tracks, the same basic ride system used by Dumbo and the Magic Carpets, just hidden in the ceiling instead of below the vehicles.'
  },
  'mk-47': {
    description: 'A simple spinning ride themed to Aladdin, where each carpet has its own up-and-down control and a small camel statue nearby that occasionally "spits" water at passersby.',
    tip: 'Functionally similar to Dumbo — if you\'ve already ridden one flying spinner that day, this is the easiest one to skip without missing much.',
    funFact: 'The spitting camel statues are a deliberate nod to similar gag fountains found in classic amusement parks, randomly soaking unsuspecting guests walking by.'
  },
  'mk-48': {
    description: 'An elevated spinning ride where small rocket-shaped vehicles circle a central tower, letting riders tilt their own ship up and down above Tomorrowland.',
    tip: 'The queue is deceptively long because you ride an elevator partway up before actually boarding — factor in extra time even when the posted wait looks short.',
    funFact: 'It\'s a direct descendant of "Astro Jets," one of the opening-day attractions when Magic Kingdom debuted in 1971, just relocated and rethemed over the decades.'
  },
  'mk-49': {
    description: 'A slow, elevated people-mover that loops through and around several Tomorrowland buildings, including a pass directly through Space Mountain\'s show building.',
    tip: 'A genuinely relaxing way to rest your feet for ten minutes — great for an evening ride when Tomorrowland\'s lights are glowing.',
    funFact: 'Part of the ride track passes directly through the Space Mountain building, letting you catch a brief glimpse of the roller coaster in the dark as you glide by.'
  },
  'mk-50': {
    description: 'A small junior roller coaster themed to a barnstorming biplane stunt show gone slightly wrong, designed as many kids\' first real coaster.',
    tip: 'Low height requirement makes it one of the most accessible thrill rides in the park — a good warmup before bigger coasters for younger riders.',
    funFact: 'The ride sits in Storybook Circus, themed around Dumbo and a vintage traveling circus, with the "crash site" props built right into the queue.'
  },
  'mk-51': {
    description: 'A real steam-powered train that circles the park, offering rare aerial views of several lands along the way.',
    tip: 'Currently running in shuttle mode rather than the full park loop while a nearby expansion area is under construction — check signage for which stations are open.',
    funFact: 'The locomotives are genuine vintage steam engines, originally built in the early 1900s and restored specifically to run at Magic Kingdom since it opened in 1971.'
  },
  'mk-52': {
    description: 'A short ride down Main Street in vintage-style vehicles — old-fashioned cars, fire trucks, and similar early-1900s transportation.',
    tip: 'A nice, brief novelty near the park entrance — better suited to a relaxed morning stroll than a planned must-do.',
    funFact: 'The vehicle designs are based on real transportation styles from the early 20th century, matching Main Street\'s overall turn-of-the-century American theming.'
  },
  'mk-53': {
    description: 'An interactive, app-guided scavenger hunt through Adventureland where you help a pirate captain search for treasure using clues and effects hidden throughout the area.',
    tip: 'Pick up the free talking pirate device at the Crow\'s Nest kiosk near the start — no extra cost, and it works well for restless kids during a slow stretch of the day.',
    funFact: 'It\'s one of the few Magic Kingdom experiences that blends a physical walking tour with a digital, choose-your-own-path style storyline.'
  },
  'mk-55': {
    description: 'A walk-through attraction inside a massive artificial tree, recreating the shipwrecked family\'s makeshift home from the Swiss Family Robinson film.',
    tip: 'Rarely has any real wait, making it a good low-effort stop if you want to see something different without committing much time.',
    funFact: 'The tree is entirely artificial, built from steel and concrete, yet it has over half a million man-made leaves attached to give it a convincingly real appearance.'
  },
  'mk-56': {
    description: 'A small-group interactive experience where guests help narrate part of the Beauty and the Beast story inside Belle\'s cottage and Maurice\'s workshop, ending with a brief meet with Belle herself.',
    tip: 'More of a character experience than a ride — good for younger kids who love Beauty and the Beast, less essential if your group is short on time.',
    funFact: 'Guests are assigned small roles in the retelling (like playing Mrs. Potts or Chip), so no two visits play out in quite the same way.'
  },
  'mk-57': {
    description: 'A classic audio-animatronic show where singing tropical birds, tiki statues, and flowers perform a tongue-in-cheek musical number inside a small theater.',
    tip: 'Short and air-conditioned — a solid choice to duck into during the hottest part of the afternoon when you want a guaranteed seat and a break from the sun.',
    funFact: 'It\'s one of the very first attractions to use Disney\'s original Audio-Animatronics technology, debuting at Disneyland years before this Magic Kingdom version opened.'
  },
  'mk-58': {
    description: 'An interactive comedy show where the audience becomes part of the act, with monster characters from Monsters, Inc. cracking jokes and reacting live to guests in the crowd.',
    tip: 'If you don\'t want to be singled out for a joke, sit toward the back — the closer seats are more likely to get called on.',
    funFact: 'Some of the jokes and crowd interactions are pre-recorded based on real submissions from guests, while others are subtly adjusted based on what\'s happening in the room that day.'
  },
  'mk-59': {
    description: 'A slow-rotating theater show following one family through changing decades of American home life, set to an original score about progress and technology.',
    tip: 'A nostalgic, low-key sit-down show — great for resting tired feet, though younger kids sometimes find the pace slow compared to other attractions.',
    funFact: 'The entire theater itself rotates around a fixed stage, making it one of the only attractions in the park where the audience — not the show — physically moves.'
  },
  'mk-60': {
    description: 'A patriotic audio-animatronic theater show featuring detailed figures of every U.S. president, with a focus on the nation\'s founding and a short address from the current president\'s figure.',
    tip: 'A calm, air-conditioned, fairly long sit-down show — best suited to a slower point in your day rather than a quick stop between rides.',
    funFact: 'Each presidential figure is built using detailed historical research, and the show has been periodically updated to add each new president as they take office.'
  },
  'mk-61': {
    description: 'An audio-animatronic musical revue featuring a cast of singing, yodeling bear characters performing old-timey country and folk tunes.',
    tip: 'A fun, air-conditioned break with a lighthearted, silly tone — good for younger kids or anyone wanting a low-stakes sit-down show.',
    funFact: 'It\'s one of the longest-running original attractions still operating at Magic Kingdom, having opened with the park back in 1971 and remained largely unchanged since.'
  },
};
