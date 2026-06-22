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
  // ── EPCOT (additional) ──
  'ep-06': {
    description: 'A space-launch motion simulator where you and three teammates take on assigned roles for a "mission" — choose the intense Orange Mission (Mars) or the gentler Green Mission (orbiting Earth).',
    tip: 'If anyone in your group gets motion sick easily, go with the Green Mission — it skips the centrifuge spin that makes Orange feel like a real launch.',
    funFact: 'The ride vehicle cabins are genuinely cramped capsules mounted to a spinning centrifuge, which is what creates the realistic liftoff G-force sensation.'
  },
  'ep-07': {
    description: 'A gentle dark ride following Figment the purple dragon through a playful journey celebrating the five senses and imagination.',
    tip: 'One of the most reliably short waits in the whole park — a good low-key stop to recharge between bigger attractions.',
    funFact: 'Figment has become something of a cult favorite despite the ride\'s modest scale, with merchandise and fan art keeping the character beloved long after his pavilion\'s original Imagination focus faded.'
  },
  'ep-08': {
    description: 'A slow boat ride through the real greenhouses and growing labs that supply produce to restaurants across Walt Disney World, showcasing experimental farming techniques.',
    tip: 'A relaxing, educational ride with usually very short waits — a nice change of pace if you need a break from bigger thrill rides.',
    funFact: 'The crops grown in these greenhouses are real and are actually served in EPCOT restaurants, making this one of the few rides at Disney with a working agricultural operation behind it.'
  },
  'ep-09': {
    description: 'A boat ride through the Mexico pavilion\'s pyramid, following Donald Duck and his Three Caballeros friends through a fiesta-gone-slightly-wrong storyline.',
    tip: 'Waits are almost always short, making this one of the best "bang for your buck" rides in the park if you want a quick, fun stop.',
    funFact: 'The ride is based on the 1944 Disney film The Three Caballeros — a movie far less well-known today than the ride itself.'
  },
  'ep-21': {
    description: 'A slow-moving dark ride inside EPCOT\'s iconic geodesic sphere, tracing the history of human communication from cave paintings to the modern era.',
    tip: 'One of the few rides that almost never has a meaningful wait — a great choice to ride right when you arrive or right before you leave.',
    funFact: 'Disney historians worked with real museums and universities while developing the ride\'s scenes in the late 1970s to keep the history depicted accurate.'
  },
  'ep-22': {
    description: 'An outdoor interactive water trail themed to Moana, where you can play with flowing water, create musical streams, and walk through small waterfalls.',
    tip: 'You can choose a "dry path" if you don\'t want to get wet, but the interactive elements are most fun if you\'re willing to get a little splashed.',
    funFact: 'The attraction lights up with extra effects after dark, making an evening visit noticeably more magical than a daytime one.'
  },
  'ep-28': {
    description: 'A live, interactive show where an animator-controlled Crush from Finding Nemo chats directly with the audience in real time.',
    tip: 'Sit near the front if you have kids who might want to ask Crush a question — he\'ll often call on specific guests by what they\'re wearing.',
    funFact: 'Despite looking like a pre-recorded video, the entire show is performed live by a hidden animator and voice actor reacting to the actual audience in the room.'
  },
  'ep-15': {
    description: 'EPCOT\'s nighttime spectacular over World Showcase Lagoon, combining fireworks, lights, fountains, and music celebrating connection and community.',
    tip: 'Stand anywhere along the lagoon promenade for a good view — the show is designed to be seen from nearly the entire loop, not just one spot.',
    funFact: 'EPCOT has cycled through several different nighttime shows over the decades, each one redesigned to reflect the park\'s evolving theme and technology.'
  },
  'ep-23': {
    description: 'A 30-minute animatronic theatrical show inside a colonial-style hall, narrating pivotal moments in American history through robotic figures of historical figures.',
    tip: 'A long, seated, air-conditioned show — great for an afternoon break when you want to sit down somewhere cool for half an hour.',
    funFact: 'The animatronic figures used here are some of the most advanced Disney has built, with a range of motion designed to feel more lifelike than older-generation robots elsewhere in the parks.'
  },
  'ep-24': {
    description: 'A 360-degree Circle-Vision film showcasing China\'s landscapes and cities, watched standing in the round as the screen wraps completely around the audience.',
    tip: 'There\'s no seating — the room is designed for guests to stand and turn to follow the action as it moves around the circular screen.',
    funFact: 'Circle-Vision 360° technology was originally developed for World\'s Fair pavilions decades before being adapted into EPCOT\'s World Showcase films.'
  },
  'ep-25': {
    description: 'A Circle-Vision 360° film celebrating Canada\'s natural beauty and major cities, shown in the round just like its China pavilion counterpart.',
    tip: 'Air-conditioned and standing-room, with no real wait most of the day — an easy add-on while strolling through World Showcase.',
    funFact: 'The film has been updated multiple times since EPCOT opened in 1982 to reflect modern Canadian landmarks and scenery.'
  },
  'ep-26': {
    description: 'A widescreen film showcasing the regions and culture of France, shown in a theater designed to feel like an intimate European cinema.',
    tip: 'A relaxing seated break in the France pavilion — pair it with a pastry from Les Halles before or after.',
    funFact: 'The five-screen panoramic format was custom-built for this theater, creating a wraparound visual effect without full 360-degree Circle-Vision.'
  },
  'ep-27': {
    description: 'A sing-along show retelling Beauty and the Beast through film clips and on-screen lyrics, encouraging the whole audience to join in.',
    tip: 'A fun, low-effort stop for families with younger kids who love singing along to the music.',
    funFact: 'It shares its theater with Impressions de France, alternating showtimes throughout the day in the same France pavilion building.'
  },
  'ep-29': {
    description: 'A short film on the second floor of The Land pavilion exploring Earth\'s natural wonders and ecosystems.',
    tip: 'Easy to miss since it\'s tucked upstairs — worth a quick stop if you\'re already at The Land pavilion for Soarin\' or Living with the Land.',
    funFact: 'It replaced an older attraction called Circle of Life, continuing The Land pavilion\'s long tradition of nature-and-conservation-themed short films.'
  },
  'ep-30': {
    description: 'A walk-up meet-and-greet with Mickey, Minnie, and friends inside CommuniCore Hall in World Celebration.',
    tip: 'Standby usually moves quickly, but Lightning Lane is available if you want to guarantee a shorter wait.',
    funFact: 'CommuniCore Hall is also a climate-controlled rest stop with charging stations, making this meet-and-greet area a popular detour even for guests not looking for a character photo.'
  },
  'ep-31': {
    description: 'A limited-hours meet-and-greet with Figment near ImageWorks in World Celebration.',
    tip: 'Check the My Disney Experience app for exact hours — Figment only appears for a couple of hours most days, not all day long.',
    funFact: 'Figment\'s popularity as a character has outlasted most of the original Imagination pavilion attractions he was created to promote.'
  },
  'ep-32': {
    description: 'A Norwegian-style character dining experience inside the Norway pavilion, where Disney princesses visit your table throughout the meal.',
    tip: 'Reservations book up quickly — this is one of the more popular character dining experiences at EPCOT, so plan ahead.',
    funFact: 'Akershus is modeled after a real medieval fortress in Oslo, Norway, of the same name.'
  },
  'ep-33': {
    description: 'A walk-up meet with Belle along the France pavilion promenade.',
    tip: 'Check posted times near the pavilion entrance — Belle\'s appearances are scheduled rather than continuous.',
    funFact: 'France is one of the most character-dense pavilions in World Showcase, also hosting Aurora in the Fragrance Gardens at certain times of day.'
  },
  'ep-34': {
    description: 'A character meet with Mulan inside the Great Hall of the China pavilion.',
    tip: 'A relatively low-key meet-and-greet — good for fans of Mulan who want a less crowded alternative to Magic Kingdom\'s princess hall.',
    funFact: 'Mulan is one of the few Disney princesses whose primary meet-and-greet location is in EPCOT rather than Magic Kingdom.'
  },
  'ep-35': {
    description: 'A character meet with Princess Jasmine inside the Morocco pavilion.',
    tip: 'Morocco tends to be one of the quieter World Showcase pavilions, so this meet often has shorter waits than character spots elsewhere.',
    funFact: 'Morocco is the only World Showcase pavilion funded directly by its home country\'s government, which is part of why its tilework and architecture feel so authentic.'
  },
  'ep-10': {
    description: 'A pavilion built around a Mesoamerican pyramid, housing the Gran Fiesta Tour ride, an indoor marketplace, and the Mexico Folk Art Gallery.',
    tip: 'La Cava del Tequila inside the pyramid is one of the most popular lounges in World Showcase — expect a wait for a table in the evening.',
    funFact: 'The entire pyramid interior is designed to feel like dusk year-round, with a permanently dim, twilight-style lighting scheme.'
  },
  'ep-36': {
    description: 'A pavilion themed to Norway, home to Frozen Ever After, the Stave Church Gallery, and authentic Norwegian shops and bakeries.',
    tip: 'Kringla Bakeri Og Kafe is a great quick stop for the famous school bread pastry without committing to the Akershus character meal.',
    funFact: 'The Stave Church Gallery building is modeled after real wooden churches found in Norway, some of which are nearly 1,000 years old.'
  },
  'ep-37': {
    description: 'A pavilion celebrating Chinese culture, featuring the Reflections of China film, intricate temple-style architecture, and the House of Good Fortune shop.',
    tip: 'The pavilion doesn\'t have its own dedicated restroom — the nearest one is a small shared facility between Lotus Blossom Cafe and Nine Dragons.',
    funFact: 'The pavilion\'s centerpiece building is modeled after the Temple of Heaven in Beijing, a real UNESCO World Heritage Site.'
  },
  'ep-38': {
    description: 'A Bavarian-style pavilion with no rides, but strong on food, beer, and atmosphere — home to the Biergarten buffet and a charming model train display.',
    tip: 'Don\'t miss the small model train village set up between Germany and Italy — it\'s easy to walk past without noticing it.',
    funFact: 'The miniature train village was originally built just for EPCOT\'s Flower and Garden Festival but became a permanent fixture due to its popularity.'
  },
  'ep-39': {
    description: 'An Italian-themed pavilion with no rides, featuring two well-regarded restaurants and frequent street performers.',
    tip: 'Catch Sergio the juggler if he\'s performing — his shows are a fan-favorite bit of unscripted World Showcase entertainment.',
    funFact: 'Tutto Gusto Wine Cellar inside this pavilion stocks more than 200 Italian wines, one of the largest Italian wine selections at Walt Disney World.'
  },
  'ep-11': {
    description: 'A pavilion centered on Japanese culture, with peaceful gardens, koi ponds, and the large Mitsukoshi department store.',
    tip: 'Walk behind the pagoda for one of the quietest, most relaxing corners in all of World Showcase if you need a break from crowds.',
    funFact: 'Mitsukoshi is a real, operating branch of a major Japanese department store chain, not just a themed Disney shop.'
  },
  'ep-40': {
    description: 'A richly tiled pavilion themed to Morocco, with winding marketplace corridors, the Spice Road Table restaurant, and a Jasmine meet-and-greet.',
    tip: 'Spice Road Table\'s waterfront patio is one of the better spots in the park to watch Luminous over dinner.',
    funFact: 'Morocco is the only World Showcase pavilion that was directly funded by its represented country\'s government, which shows in the authenticity of its architecture and tile work.'
  },
  'ep-12': {
    description: 'A Parisian-styled pavilion with Remy\'s Ratatouille Adventure, two classic films, and some of the best bakeries in all of Walt Disney World.',
    tip: 'Les Halles Boulangerie-Patisserie is widely considered the best quick-service bakery in the entire park — worth the stop even if you\'re not hungry yet.',
    funFact: 'The pavilion includes a scaled-down replica of the Eiffel Tower, built at roughly 1/10th the size of the real Paris landmark.'
  },
  'ep-13': {
    description: 'A pavilion themed to the United Kingdom, with a classic pub, manicured gardens, and a Mary Poppins meet-and-greet.',
    tip: 'Rose & Crown Pub has a small lagoon-side patio that\'s a great quiet spot to watch the nighttime show with a drink in hand.',
    funFact: 'The pavilion\'s architecture intentionally mixes several different historical English building styles into one walkable street.'
  },
  'ep-14': {
    description: 'A pavilion celebrating Canada, with Le Cellier steakhouse and the Canada Far and Wide Circle-Vision film.',
    tip: 'Le Cellier is one of the hardest table-service reservations to book in all of EPCOT — plan well ahead if you want a table.',
    funFact: 'The pavilion\'s landscaping was modeled after Canada\'s Butchart Gardens, a real and famous garden in British Columbia.'
  },
  // ── Hollywood Studios ──
  'hs-01': {
    description: 'A sprawling, multi-room dark ride that drops you into the middle of a Star Wars battle between the Resistance and the First Order — part ride, part walk-through, part live theater.',
    tip: 'Widely considered the single best attraction at Walt Disney World. It only offers Lightning Lane Single Pass (no standby skip), so either rope drop it at Early Entry or be ready to pay for the separate pass.',
    funFact: 'The ride uses several entirely different ride systems stitched together into one continuous experience — including a trackless vehicle segment, a drop sequence, and a full-scale walk-through set.'
  },
  'hs-02': {
    description: 'A flight-simulator ride where you and your party take on roles as pilot, gunner, or engineer aboard the actual Millennium Falcon.',
    tip: 'Volunteer to be the pilot if you can — it\'s the most interactive role and lets you actually steer. A May 2026 update added new Mandalorian and Grogu-themed missions, so the storyline now varies more than before.',
    funFact: 'The cockpit set is a near screen-accurate recreation of the Millennium Falcon from the films, right down to the placement of switches and panels.'
  },
  'hs-03': {
    description: 'A family-friendly outdoor coaster themed to Slinky Dog from Toy Story, winding through a backyard built at "toy scale."',
    tip: 'One of the most popular family coasters at Walt Disney World — ride first thing at rope drop, since waits regularly climb past an hour by mid-morning.',
    funFact: 'The ride\'s spring-like dips are designed to recreate the bouncing motion of an actual stretched-out Slinky Dog toy.'
  },
  'hs-04': {
    description: 'A drop ride themed to The Twilight Zone, sending you up and down a haunted hotel elevator shaft in a randomized, unpredictable sequence of falls.',
    tip: 'The randomized drop pattern means no two rides feel exactly the same — a good one to revisit more than once if you can.',
    funFact: 'The pre-show walkthrough, including the eerie hotel lobby and library, was designed with as much care as the ride itself and is easy to miss if you rush through it.'
  },
  'hs-05': {
    description: 'A high-speed launch coaster that rockets you from 0 to 60 mph in under three seconds, now reimagined around The Muppets and their chaotic dash to a concert.',
    tip: 'Reopened May 26, 2026 after the previous Aerosmith version permanently closed — expect high demand all summer as fans check out the new theming.',
    funFact: 'The ride track and launch system are unchanged from the original version — only the story, music, and pre-show changed, including the addition of Disney\'s first-ever Audio-Animatronic of Scooter the Muppet.'
  },
  'hs-06': {
    description: 'An interactive 3D shooting-gallery ride where you compete in a series of carnival-style games alongside Toy Story characters.',
    tip: 'Your score genuinely matters here — there are secret high-value targets some scenes hide, so look for them if you want bragging rights.',
    funFact: 'Each ride vehicle holds two riders side by side, each with their own individual screen and shooter, so you\'re technically playing a separate game from whoever\'s next to you.'
  },
  'hs-07': {
    description: 'A simple spinning ride themed to a toy alien-claw game, swinging riders around in saucers driven by Little Green Men.',
    tip: 'A gentle, short ride best suited to younger kids — skip it if your group is short on time and prioritizing bigger attractions instead.',
    funFact: 'The ride sits on the site of the former Honey, I Shrunk the Kids Movie Set Adventure, repurposed when Toy Story Land was built.'
  },
  'hs-08': {
    description: 'A trackless dark ride inside the Chinese Theatre that shrinks you to cartoon size and sends you through a chaotic adventure alongside Mickey and Minnie.',
    tip: 'No height requirement and genuinely fun for all ages — a great choice early in the day before lines build.',
    funFact: 'It was the first ride-through attraction in Disney park history built entirely around classic Mickey Mouse cartoon shorts rather than a feature film.'
  },
  'hs-20': {
    description: 'A 3D motion-simulator ride that puts you aboard a Star Wars Starspeeder for a randomized space journey — the destinations and characters change from ride to ride.',
    tip: 'Usually a walk-on or short wait even during busy times, making it an easy, reliable choice if you want a guaranteed quick ride.',
    funFact: 'There are over 50 possible story combinations programmed into the ride, meaning two visits rarely play out exactly the same way.'
  },
  'hs-09': {
    description: 'A live stunt show re-enacting scenes from Raiders of the Lost Ark, with real performers, fire effects, and a giant rolling boulder.',
    tip: 'Runs multiple times daily — check the app for exact times since the schedule shifts, and arrive 20-30 minutes early for a good seat.',
    funFact: 'Audience members are sometimes pulled on stage to play extras in the action, making each showing slightly different depending on who gets picked.'
  },
  'hs-10': {
    description: 'A nighttime spectacular combining live performers, pyrotechnics, water effects, and classic Disney villains across an outdoor amphitheater stage.',
    tip: 'Seating fills up well before showtime on busy nights — arrive at least 30-45 minutes early, or consider a Fantasmic dining package for guaranteed seats.',
    funFact: 'The show uses a massive water screen as a surface for projected effects, a technique that requires careful timing with the live performers on stage.'
  },
  'hs-12': {
    description: 'A sing-along stage show retelling the story of Frozen through film clips and on-screen lyrics, hosted by live performers who keep the audience engaged.',
    tip: 'The show runs over 30 minutes, longer than guests often expect — a good pick if you want a substantial sit-down break in the air conditioning.',
    funFact: 'Despite the show\'s name, it actually walks through the entire plot of the film, not just a single musical sequence.'
  },
  'hs-21': {
    description: 'A live stage show where classic Disney villains argue over who has been treated most unfairly by their stories, performed with full musical numbers.',
    tip: 'Opened in May 2025 in the Sunset Showcase theater — newer and less crowded than some of the park\'s longer-running shows, so it\'s often easier to walk into without a long wait.',
    funFact: 'The show features a rotating cast of villain cameos beyond its three lead characters, giving longtime Disney fans plenty of background appearances to spot.'
  },
  'hs-22': {
    description: 'An interactive stage show where Mickey and Minnie set off to track down Goofy, Daisy, and Pluto in time for a big celebration, with original songs and audience participation throughout.',
    tip: 'Built for young kids who want to move, clap, and dance rather than sit still — a great pick if you have little ones who need to burn some energy.',
    funFact: 'The show runs eight times daily and is the centerpiece attraction of the newly reimagined Walt Disney Studios area that opened the same day, May 26, 2026.'
  },
  'hs-23': {
    description: 'A behind-the-scenes exhibit and short film exploring the history of Walt Disney Animation Studios and the artistry behind classic and modern Disney films.',
    tip: 'A relaxed, air-conditioned stop with no wait most of the time — easy to slot in in between bigger attractions.',
    funFact: 'The space has changed names and focus several times over the decades, each version reflecting whatever Disney animated era was most current at the time.'
  },
  'hs-13': {
    description: 'A hands-on workshop experience where guests build their own custom lightsaber from a selection of parts, guided by in-character "Gatherers."',
    tip: 'Reservations are recommended and the experience runs about 20 minutes — budget real time for this, it\'s not a quick walk-up purchase.',
    funFact: 'Each build station has its own unique selection of parts and crystal colors, so the build process and final result genuinely differ from station to station.'
  },
  'hs-14': {
    description: 'A build-your-own droid experience where you assemble and personalize a small rolling droid from parts moving along a conveyor system.',
    tip: 'A fun, lower-cost alternative to the lightsaber workshop if you want a Galaxy\'s Edge souvenir without the bigger price tag.',
    funFact: 'The droid parts move along a real conveyor belt system inspired by actual droid depot designs seen throughout the Star Wars films.'
  },
  // ── Animal Kingdom ──
  'ak-01': {
    description: 'A 3D flight simulator that puts you on the back of a banshee soaring over the floating mountains and bioluminescent jungles of Pandora.',
    tip: 'Consistently ranked among the very best rides at Walt Disney World. Lightning Lane Single Pass is the single most valuable purchase you can make at this park — it disappears fast.',
    funFact: 'Each ride vehicle is custom-fitted to your body before boarding, including foot straps and a backrest, so the banshee\'s movements feel physically connected to your own.'
  },
  'ak-02': {
    description: 'A guided truck safari through a sprawling, real savanna habitat where giraffes, lions, elephants, and dozens of other African species roam freely.',
    tip: 'Ride it as early as possible — animals are most active in the cooler morning hours and tend to be far less visible by midday heat.',
    funFact: 'The 110-acre savanna is a genuine, living habitat, not a themed set — what you see each ride is real, unscripted animal behavior.'
  },
  'ak-03': {
    description: 'A backward-facing roller coaster that winds up, through, and around a recreation of Mount Everest, with a close encounter with the Yeti along the way.',
    tip: 'A single-rider line is available and can meaningfully cut your wait if you don\'t mind riding without your group.',
    funFact: 'The Yeti animatronic inside the mountain is one of the largest and most complex Audio-Animatronics figures Disney has ever built.'
  },
  'ak-04': {
    description: 'A slow, atmospheric boat ride through a glowing bioluminescent rainforest in search of the Na\'vi Shaman of Songs.',
    tip: 'Less thrilling but visually stunning — ride it right after Flight of Passage in the morning while the Pandora area still has shorter lines.',
    funFact: 'The Shaman of Songs figure is one of the largest Audio-Animatronics ever built by Disney, with a face capable of remarkably subtle expressions.'
  },
  'ak-05': {
    description: 'A river raft ride through the Chakranadi River, with a steep splash-down finale that genuinely soaks riders.',
    tip: 'A great choice on a hot Florida afternoon — just know you will get wet, especially in the front of the raft.',
    funFact: 'Pieces of the destroyed logging set throughout the ride were intentionally weathered and aged to tell the story of illegal deforestation before guests ever read a placard about it.'
  },
  'ak-08': {
    description: 'A 30-minute musical and acrobatic stage show retelling The Lion King through massive parade-style floats, aerialists, and stilt performers.',
    tip: 'One of the most beloved shows at Walt Disney World — arrive 20-30 minutes early, since the theater fills up fast and good seats go quickly.',
    funFact: 'The show combines elements of Broadway-style staging with circus-level acrobatics, including aerial silk performers suspended high above the audience.'
  },
  'ak-17': {
    description: 'A 4D film experience starring Judy Hopps and Nick Wilde from Zootopia, combining a wraparound screen with in-theater physical effects.',
    tip: 'Opened in November 2025 inside the same theater that long housed It\'s Tough to Be a Bug! — air-conditioned with generally short waits.',
    funFact: 'The theater itself, inside the base of the Tree of Life, has hosted several different shows since the park opened in 1998, each one themed to whatever wildlife story Disney wanted to tell at the time.'
  },
  'ak-10': {
    description: 'A self-guided walking trail through lush habitats with western lowland gorillas, hippos, naked mole rats, meerkats, and okapis.',
    tip: 'One of the most underrated experiences in the park — slow down and take your time here, especially at the gorilla habitat, which is genuinely one of the best in any zoo or theme park.',
    funFact: 'The trail was designed by real conservationists alongside Imagineers, with habitat layouts based on actual African ecosystems rather than just aesthetic theming.'
  },
  'ak-11': {
    description: 'A self-guided walking trail through the ruins of a fictional maharajah\'s palace, home to Komodo dragons, Malayan tapirs, fruit bats, and Bengal tigers.',
    tip: 'The tiger habitat here is one of the best in any theme park, with multiple viewing areas and glass panels putting you just inches from the animals — give yourself real time here.',
    funFact: 'The "ruins" theming throughout the trail tells a deliberate story of a palace reclaimed by nature, with real plant overgrowth incorporated into the architecture by design.'
  },
  'ak-12': {
    description: 'A nighttime projection show on the Tree of Life itself, with animals and imagery animated across its sculpted trunk and branches.',
    tip: 'Only runs seasonally, from mid-November through early March, when the park stays open late enough for it to get properly dark — check the app to see if it\'s currently running.',
    funFact: 'The same tree used for these nighttime projections has more than 300 hand-carved animal figures sculpted into its bark, visible during the day as well.'
  },
  'ak-18': {
    description: 'A park-wide interactive activity where you pick up a Field Guide and visit stations throughout Animal Kingdom to complete simple challenges and earn badges from "troop leaders."',
    tip: 'A great way to fill slower stretches of the day, especially when ride lines get long — pick up the guide early and tackle a station or two between bigger attractions.',
    funFact: 'There are dozens of different badges to earn scattered across every land in the park, and completionists can spend an entire extra day just tracking them all down.'
  },
  'ak-19': {
    description: 'An interactive play experience inside Conservation Station where guests join Bluey and Bingo in recreations of the show\'s most iconic family games.',
    tip: 'A virtual queue is required during the initial opening period — grab a spot through the My Disney Experience app at 7:00 a.m. or 10:00 a.m. on your visit day.',
    funFact: 'This experience took over the space previously used for backstage animal care exhibits, continuing Conservation Station\'s long history of changing its focus over the years.'
  },
  'ak-20': {
    description: 'A real train that carries guests from Harambe Station in Africa to Conservation Station, passing through backstage glimpses of animal habitats along the way.',
    tip: 'This is the only way to reach Conservation Station — there\'s no walking path, so budget the round-trip ride time into your plans if you want to see Bluey\'s Wild World.',
    funFact: 'The train genuinely passes near real backstage animal care areas, meaning what you glimpse out the window during the ride isn\'t themed set dressing.'
  },
  'ak-21': {
    description: 'A live outdoor bird show at the Caravan Stage featuring trained birds of prey and exotic species flying directly over and around the audience.',
    tip: 'Sit toward the back or middle rather than the very front row if you\'d rather not have a bird fly inches above your head — though that\'s honestly half the fun for most guests.',
    funFact: 'Many of the birds featured were rescued or rehabilitated before being trained for the show, and several species featured can\'t be found in any other Disney attraction.'
  },
  'ak-22': {
    description: 'A simple, themed meet-and-greet with Mickey and Minnie dressed as explorers, set inside a small expedition-themed headquarters.',
    tip: 'Usually a quick, low-wait meet — a good casual stop if you\'re passing through Discovery Island rather than something to plan your whole day around.',
    funFact: 'The "expedition" theming throughout the queue ties into the park\'s overall conservation and exploration storyline, distinguishing it from character meets at the other parks.'
  },
  'ak-23': {
    description: 'A small, self-guided viewing area showcasing cotton-top tamarins, a tiny and endangered primate species.',
    tip: 'Easy to walk past without noticing — worth a quick stop if you\'re already in Asia and have a couple of spare minutes.',
    funFact: 'Cotton-top tamarins are genuinely one of the most endangered primate species in the world, and this exhibit ties directly into Disney\'s real conservation funding efforts for the species.'
  },
  'ak-24': {
    description: 'A series of lush garden habitats right at the park entrance, featuring giant anteaters, swamp wallabies, and other unusual species as your very first stop in the park.',
    tip: 'Easy to rush past on the way to bigger rides, but worth a slow look on your way out at the end of the day when crowds have thinned.',
    funFact: 'The Oasis was deliberately designed as a decompression zone, meant to slow guests down and shift their mindset before they reach the wide-open energy of Discovery Island.'
  },
  // ── Disneyland ──
  'dl-01': {
    description: 'A jeep ride through ancient ruins, dodging boulders, snakes, and fire while searching for treasure, with a randomized path that varies between rides.',
    tip: 'The single most physically intense dark ride at Disneyland — genuinely jostling. There\'s no Lightning Lane here, so ride it early or accept the standby wait.',
    funFact: 'There are multiple possible ride paths programmed into the attraction, meaning you can ride it several times in a row and still see different scenes each time.'
  },
  'dl-02': {
    description: 'The original version of the boat cruise past dozens of singing dolls representing cultures from around the world — the attraction that started the whole "Small World" concept.',
    tip: 'Calm, indoor, and air-conditioned — useful for cooling off during the hottest stretch of a Southern California afternoon.',
    funFact: 'This is the original 1966 version of the ride, predating every other "Small World" built at Disney parks worldwide since.'
  },
  'dl-03': {
    description: 'A sprawling, multi-room Star Wars experience that puts you in the middle of a battle between the Resistance and the First Order, blending several different ride systems into one continuous story.',
    tip: 'Widely regarded as the best ride at Disneyland. No Lightning Lane standby skip exists — only a separate paid Single Pass — so plan around rope drop or be ready to pay.',
    funFact: 'The ride uses several entirely different ride vehicle types stitched together, including a trackless segment and a simulated drop, making it feel like multiple attractions in one.'
  },
  'dl-04': {
    description: 'A slow "doom buggy" ride through a haunted mansion filled with ghosts, holograms, and classic Disney special effects.',
    tip: 'A reliable, lower-wait choice most of the day since the ride moves a continuous stream of guests — a good one to slot in when bigger rides have long lines.',
    funFact: 'This is the original Haunted Mansion, opened in 1969, which every other version of the ride at other Disney parks has drawn inspiration from.'
  },
  'dl-05': {
    description: 'A boat ride through scenes of pirates raiding a Caribbean town, with cannon fire, treasure, and a memorable drop near the start.',
    tip: 'The original and longest version of this ride at any Disney park — the extra length means extra scenes you won\'t find at the Florida version.',
    funFact: 'Walt Disney personally oversaw this 1967 attraction\'s design — it was the last ride he helped create before he passed away.'
  },
  'dl-06': {
    description: 'A bobsled-style coaster that winds through and around a scale model of the Matterhorn mountain, with a brief Yeti encounter inside.',
    tip: 'Ride sensation varies noticeably depending on which side of the mountain your sled takes — if you didn\'t love it the first time, try again, since the two tracks feel different.',
    funFact: 'It was the first tubular steel track roller coaster ever built, a design innovation that influenced coaster engineering well beyond Disney parks.'
  },
  'dl-07': {
    description: 'A log flume coaster following Princess Tiana and Louis as they prepare for their first Mardi Gras performance, with a steep splashdown finale.',
    tip: 'You will get wet, especially in the front seats — if you want to stay dry for the rest of your day, sit toward the back or bring a poncho.',
    funFact: 'The ride track and overall layout are unchanged from the previous Splash Mountain — only the scenes, music, and characters were swapped during the retheme.'
  },
  'dl-08': {
    description: 'An indoor space-themed roller coaster that runs almost entirely in the dark, so the drops and turns catch you by surprise.',
    tip: 'The darkness makes the ride feel faster and more intense than its actual top speed — a great choice to ride more than once since the mystery factor doesn\'t fade much.',
    funFact: 'It was one of the first roller coasters in the world to be built almost entirely indoors, opening in 1977 and influencing similar dark coasters built afterward.'
  },
  'dl-09': {
    description: 'A runaway mine train coaster winding through a crumbling Western mining town, complete with flash floods and falling rocks.',
    tip: 'A great ride after dark, when the lighting effects and theming read very differently than they do in daylight.',
    funFact: 'This was the very first "mine train" style coaster Disney ever built, debuting the concept that would later be reused at Magic Kingdom and other parks.'
  },
  'dl-10': {
    description: 'A flying-galleon dark ride that lifts you over a miniature glowing London and into Neverland, retracing scenes from the Peter Pan story.',
    tip: 'No height requirement, but waits build fast since the ride loads slowly — go early or be ready for a real line later in the day.',
    funFact: 'The "flying" effect comes from overhead tracks, the same basic technology used by Dumbo and several other Fantasyland attractions, just hidden in the ceiling.'
  },
  'dl-11': {
    description: 'A boat cruise past animatronic animals and ruins, narrated by a deliberately corny skipper delivering puns the whole way.',
    tip: 'The humor is the main draw — an enthusiastic skipper can make the same ride feel completely different from one you\'ve done before.',
    funFact: 'Disneyland\'s Jungle Cruise queue and boats predate every other version of this ride built at Disney parks elsewhere.'
  },
  'dl-12': {
    description: 'A flight-simulator ride where you and your party take on roles as pilot, gunner, or engineer aboard the actual Millennium Falcon.',
    tip: 'Volunteering to pilot gives you the most interactive role and lets you actually steer — worth calling dibs if you\'re riding with a group.',
    funFact: 'The cockpit set is a near screen-accurate recreation of the Millennium Falcon from the films, down to the placement of individual switches and panels.'
  },
  'dl-23': {
    description: 'A whimsical dark ride retelling scenes from the 1949 animated short, riding "as Mr. Toad" through a chaotic, occasionally fiery journey.',
    tip: 'Short and silly — a fun nostalgic stop, though modern riders sometimes find the pace and theming a bit dated compared to newer dark rides.',
    funFact: 'This Disneyland version is one of the only places in the world where you can still ride Mr. Toad\'s Wild Ride — the Magic Kingdom version closed in 1998.'
  },
  'dl-24': {
    description: 'A dark ride retelling the story of Snow White, including her escape from the Evil Queen through a genuinely spooky forest sequence.',
    tip: 'A bit more intense than its cheerful title suggests — the witch and forest scenes can startle very young children.',
    funFact: 'The ride was renamed and reworked in 2021 to add Snow White herself into more of the story, addressing a long-standing fan complaint that the original barely featured her.'
  },
  'dl-25': {
    description: 'A dark ride following Alice down the rabbit hole and through a series of surreal, brightly colored scenes from the film.',
    tip: 'One of the more underrated Fantasyland dark rides — usually shorter waits than its more famous neighbors.',
    funFact: 'The ride opened in 1958, three years after Disneyland itself, making it one of the park\'s older surviving attractions.'
  },
  'dl-26': {
    description: 'A dark ride retracing Pinocchio\'s journey, including his transformation temptation at Pleasure Island and his escape from Monstro the whale.',
    tip: 'A classic, gentle dark ride — good for younger kids, though the Pleasure Island scene has a slightly eerie undertone worth knowing about beforehand.',
    funFact: 'It was one of three new dark rides added to Fantasyland in 1983 as part of a major overhaul, alongside Snow White\'s and a redesigned Mr. Toad.'
  },
  'dl-27': {
    description: 'A classic carousel ride with hand-painted horses, set at the literal center of Fantasyland.',
    tip: 'Quick, simple, and rarely has a meaningful wait — an easy add-on for younger kids without eating into your schedule.',
    funFact: 'Several of the horses date back to an antique carousel built in 1875, restored and incorporated when Disneyland opened in 1955.'
  },
  'dl-28': {
    description: 'A spinning ride where guests sit in giant teacups and can spin themselves faster by turning a center wheel.',
    tip: 'Genuinely dizzying if you spin hard — sit this one out if you\'re prone to motion sickness, or take it easy on the wheel.',
    funFact: 'It\'s based on the "Unbirthday Party" scene from Alice in Wonderland, one of several Fantasyland rides drawn directly from that film.'
  },
  'dl-29': {
    description: 'A classic spinning ride where each rider controls their own flying elephant, raising and lowering it by hand.',
    tip: 'A simple, low-key ride best suited to younger kids — skip it if your group is short on time.',
    funFact: 'It was one of Disneyland\'s original opening-day attractions in 1955 and has barely changed in concept since.'
  },
  'dl-30': {
    description: 'A small train ride through a "circus tent" tunnel and around Storybook Land, themed to Dumbo\'s circus train friend.',
    tip: 'A gentle, short ride that pairs naturally with Storybook Land Canal Boats nearby — good for a slower-paced stretch of your day.',
    funFact: 'It was also part of Disneyland\'s original 1955 opening-day lineup, making it one of the longest continuously running attractions in the park.'
  },
  'dl-31': {
    description: 'A slow boat ride past miniature recreations of scenes and buildings from classic Disney animated films.',
    tip: 'Easy to underestimate — the detail in the tiny models rewards a slow, attentive ride rather than rushing through.',
    funFact: 'Many of the miniature buildings were hand-built using forced-perspective techniques, making them look larger and more distant than they actually are.'
  },
  'dl-32': {
    description: 'A spinning ride where small rocket-shaped vehicles circle a tower near the entrance to Tomorrowland, letting riders tilt their ship up and down.',
    tip: 'Similar to Dumbo conceptually — an easy one to skip if you\'ve already done a flying spinner ride elsewhere in the park.',
    funFact: 'Unlike its Magic Kingdom counterpart, Disneyland\'s version sits at ground level rather than elevated on a platform.'
  },
  'dl-33': {
    description: 'A driving ride along a winding track in small gas-powered cars, with kids old enough able to take the wheel themselves.',
    tip: 'The loading process is slower than the posted wait time suggests — a lower priority pick unless your kids are excited to drive.',
    funFact: 'The cars are genuine gas-powered vehicles guided by a center rail, not pure simulators, so you can actually smell the exhaust while waiting in the queue.'
  },
  'dl-34': {
    description: 'An interactive dark ride where you and a partner aim laser blasters at targets while battling the Evil Emperor Zurg alongside Buzz Lightyear.',
    tip: 'Twist the handle on your ride vehicle to spin it and improve your aim at different targets — most first-time riders don\'t realize the car rotates.',
    funFact: 'Your score is tallied and displayed at the end, and dedicated fans have mapped out the highest-value hidden targets across the ride.'
  },
  'dl-35': {
    description: 'A real steam-powered train that loops around the perimeter of the park, including a pass through a recreated Grand Canyon diorama.',
    tip: 'A relaxing way to see the whole park from a different vantage point — good for resting tired feet partway through your day.',
    funFact: 'The locomotives are genuine vintage-style steam engines, and the ride has operated continuously since Disneyland\'s 1955 opening day.'
  },
  'dl-36': {
    description: 'A short ride down Main Street in vintage-style vehicles, including old-fashioned cars and a horse-drawn streetcar.',
    tip: 'Limited operating hours compared to most attractions — catch it if you happen to be on Main Street when it\'s running rather than planning around it.',
    funFact: 'The horse-drawn streetcar is pulled by real horses, making it one of the only attractions at any Disney park that uses live animals as part of the ride itself.'
  },
  'dl-37': {
    description: 'A scenic paddle-wheel riverboat cruise around the Rivers of America, passing Tom Sawyer Island and other Frontierland scenery.',
    tip: 'A relaxing, low-energy ride — good for a slower moment in your day or for guests who want to sit down without committing to a full meal break.',
    funFact: 'It\'s a genuine, functioning paddle-wheel steamboat, not just a themed boat — one of very few operating in the United States at all.'
  },
  'dl-38': {
    description: 'A tall sailing ship that cruises the same Rivers of America route as the Mark Twain Riverboat, offering a different vantage point and a more nautical theme.',
    tip: 'Operates on seasonal hours rather than running all day — check the app to see if it\'s currently sailing before planning around it.',
    funFact: 'It\'s a working reproduction of an 18th-century merchant ship, complete with real rigging and sails, even though the boat is mechanically powered.'
  },
  'dl-39': {
    description: 'A walk-through exploration area accessible by raft, with caves, bridges, and pirate-themed details to wander through at your own pace.',
    tip: 'A great choice for letting kids burn energy and explore freely — there\'s no fixed path, so budget extra time if your group likes to poke around.',
    funFact: 'The island previously had a more general "Tom Sawyer" theme before being reworked with a pirate overlay following the success of the Pirates of the Caribbean films.'
  },
  'dl-40': {
    description: 'A guest-paddled canoe ride around Tom Sawyer Island, with everyone in the canoe helping paddle the route.',
    tip: 'A genuinely tiring ride since you\'re doing real physical work — a fun novelty rather than something to prioritize if you\'re trying to conserve energy for later in the day.',
    funFact: 'It\'s one of the only attractions at any Disney park where guests provide the actual propulsion for the ride vehicle.'
  },
  'dl-41': {
    description: 'A trackless dark ride that shrinks you to cartoon size and sends you through a chaotic adventure alongside Mickey and Minnie.',
    tip: 'No height requirement and genuinely fun for all ages — a great pick early in the day before Toontown gets crowded.',
    funFact: 'It was the first ride-through attraction built entirely around classic Mickey Mouse cartoon shorts, rather than a feature film.'
  },
  'dl-42': {
    description: 'A spinning dark ride through a cartoon Los Angeles, dodging chaotic obstacles alongside characters from Who Framed Roger Rabbit.',
    tip: 'A fast-moving, slightly disorienting ride due to the spinning vehicle — skip it if your group is sensitive to that kind of motion.',
    funFact: 'It\'s one of the only major Disney attractions based on a film not produced or distributed solely by Disney Animation, since Who Framed Roger Rabbit was a Touchstone release.'
  },
  'dl-43': {
    description: 'A small family coaster themed to Chip and Dale, winding through an oversized cartoon backyard.',
    tip: 'A good first real coaster for younger kids thanks to its modest height requirement and gentle pacing.',
    funFact: 'It replaced a previous Toontown attraction called Gadget\'s Go Coaster, rethemed with updated characters and a refreshed layout.'
  },
  'dl-13': {
    description: 'A nighttime spectacular combining live performers, pyrotechnics, water effects, and classic Disney characters across the Rivers of America.',
    tip: 'Seating fills up well before showtime on busy nights — arrive at least 30-45 minutes early, or consider a dining package for guaranteed seating.',
    funFact: 'The show uses the Rivers of America itself as a stage, with performers, sets, and effects appearing directly on and around the water.'
  },
  'dl-15': {
    description: 'A nostalgic nighttime parade featuring glowing, light-covered floats and classic Disney characters, dating back to the park\'s early decades.',
    tip: 'Only runs seasonally — check the app to see if it\'s currently scheduled before planning your evening around it.',
    funFact: 'The parade first debuted in 1972 and has returned for limited seasonal runs multiple times since, each revival drawing crowds of longtime fans.'
  },
  'dl-16': {
    description: 'A fireworks show over Sleeping Beauty Castle combining pyrotechnics, music, and projection effects across the castle façade.',
    tip: 'Arrive at least 30-45 minutes early for a good spot on Main Street or near the Hub on busy nights.',
    funFact: 'The show incorporates archival audio and visual references spanning decades of Disney history, making it as much a tribute show as a fireworks display.'
  },
  'dl-44': {
    description: 'An interactive stage show transforming the Fantasyland Theatre into Bluey\'s school, with Bluey and Bingo leading the audience through songs and games from the show.',
    tip: 'Opened March 22, 2026 — newer and often less crowded than longer-running shows, so it can be easier to walk into without a long wait.',
    funFact: 'Audience participation includes playing actual games from the show, like Keepy Uppy, alongside Bluey and Bingo themselves.'
  },
  'dl-45': {
    description: 'A historical theater presentation featuring an Audio-Animatronic Abraham Lincoln delivering portions of his real speeches.',
    tip: 'A quiet, seated, air-conditioned break — good for resting tired feet in the middle of a long day on Main Street.',
    funFact: 'The Lincoln figure debuted at the 1964 World\'s Fair before being moved to Disneyland, making it one of the very first Audio-Animatronics Disney ever built.'
  },
  'dl-46': {
    description: 'A small-fee interactive shooting gallery in Frontierland, using infrared rifles aimed at gags hidden throughout a Western-themed set.',
    tip: 'A fun, low-cost diversion if you have a few extra minutes and quarters to spare — not essential, but a nice change of pace.',
    funFact: 'It\'s one of the last coin-operated attractions still running at Disneyland, a holdover from an earlier era of theme park entertainment.'
  },
  'dl-47': {
    description: 'A self-guided walk-through diorama inside Sleeping Beauty Castle itself, narrating the story of the film through small scenes and displays.',
    tip: 'Quick and easy to fit in on your way past the castle — a nice bit of detail most guests walk right past without noticing.',
    funFact: 'It was one of Disneyland\'s original 1955 opening-day attractions and has been refreshed multiple times while keeping its core storytelling concept intact.'
  },
  // ── Disney California Adventure ──
  'dca-01': {
    description: 'A racing-themed dark ride and outdoor coaster through Radiator Springs, Route 66-style desert scenery, with each car genuinely racing against another.',
    tip: 'Widely considered the best ride at DCA and one of the best anywhere at Disneyland Resort — ride at rope drop or grab Lightning Lane as early as possible, since it sells out fast.',
    funFact: 'It\'s one of the most expensive rides Disney has ever built, with a budget that made Cars Land one of the costliest single-land expansions in Disney park history.'
  },
  'dca-02': {
    description: 'A drop ride reimagined around a Guardians of the Galaxy storyline, with a randomized drop pattern and an in-ride soundtrack that varies between visits.',
    tip: 'During Halloween season, the ride transforms into a spookier "Monsters After Dark" version — worth riding both if you visit during that window.',
    funFact: 'It occupies the same building and uses much of the same drop mechanism as the original Twilight Zone Tower of Terror, which it replaced in 2017.'
  },
  'dca-03': {
    description: 'An interactive trackless dark ride where you sling webs at rogue Spider-Bots using a hand-tracking ride vehicle system.',
    tip: 'Your score matters — try to hit moving targets rather than stationary ones for higher points, and don\'t be afraid to really gesture with your whole arm.',
    funFact: 'It uses motion-tracking technology to read your actual arm movements, rather than a simple button or trigger, making the "web slinging" feel more physically real.'
  },
  'dca-04': {
    description: 'A high-speed coaster themed to The Incredibles, featuring an inversion loop and a launch sequence that\'s the longest of its kind in the world.',
    tip: 'The launch and inversion make this one of the more intense rides at the resort — a single-rider line is sometimes available to cut your wait.',
    funFact: 'At over 6,000 feet long, it holds the record as the longest inverting roller coaster in the world.'
  },
  'dca-06': {
    description: 'A hang-gliding motion simulator that lifts your seats into the air to "soar" over famous landmarks on a giant wraparound screen, with scent effects timed to the visuals.',
    tip: 'Best ridden midday with a Lightning Lane reservation — the load times are long, so rope-dropping it isn\'t usually efficient.',
    funFact: 'This ride has cycled through several different film versions over the years — Soarin\' Over California, Soarin\' Around the World, and an upcoming Soarin\' Across America — all using the exact same ride system.'
  },
  'dca-07': {
    description: 'A whitewater raft ride that circles a mountain, finishing with a real splash-down soaking for everyone aboard.',
    tip: 'A great choice on a hot day — just know you will get wet, often quite thoroughly, so plan accordingly if you have electronics in your pockets.',
    funFact: 'The "logging camp" theming throughout the queue and ride was designed to tell a subtle environmental story about deforestation before guests ever read an official placard about it.'
  },
  'dca-08': {
    description: 'A flight-school-themed swinging ride that lifts riders into spinning aerial loops above Paradise Gardens Park.',
    tip: 'More intense than it looks from the ground — if you\'re unsure about spinning rides, watch a cycle first before committing.',
    funFact: 'The ride\'s "flight school" storyline ties into a series of Goofy cartoon shorts about him learning (and failing) to fly properly.'
  },
  'dca-09': {
    description: 'A giant Ferris wheel offering panoramic park views, with both swinging and stationary gondola options.',
    tip: 'Choose a non-swinging gondola if you\'d rather have a calm, scenic ride — the swinging cars add real motion on top of the height.',
    funFact: 'It was rethemed from "Mickey\'s Fun Wheel" to "Pixar Pal-A-Round" as part of the larger Pixar Pier overhaul in 2018, with Pixar characters added throughout.'
  },
  'dca-10': {
    description: 'An interactive 3D shooting-gallery ride where you compete in carnival-style games alongside Toy Story characters.',
    tip: 'Look for secret bonus targets in certain scenes — dedicated fans have mapped out several hidden high-value shots that casual riders miss.',
    funFact: 'Each ride vehicle seats riders side by side with individual screens, meaning you and your seatmate are technically playing separate games simultaneously.'
  },
  'dca-11': {
    description: 'A slow-moving dark ride retelling the story of Monsters, Inc., with a few notable practical effects along the way.',
    tip: 'Scheduled to permanently close in 2027, so if seeing it is a priority for you, don\'t put it off for a future visit.',
    funFact: 'It\'s one of the only dark rides at Disneyland Resort based on a film without an equivalent attraction anywhere at Walt Disney World.'
  },
  'dca-21': {
    description: 'A gliding, spinning family ride themed to Luigi from Cars, with vehicles that move in unpredictable looping patterns across the pavement.',
    tip: 'A gentler alternative to Radiator Springs Racers if you have younger kids in Cars Land who aren\'t tall enough for the bigger ride.',
    funFact: 'It replaced an earlier, more basic version of the same concept called Luigi\'s Flying Tires, redesigned after the original ride system proved difficult to maintain.'
  },
  'dca-22': {
    description: 'A bumper-car-style spinning ride themed to Mater from Cars, set in a junkyard backdrop.',
    tip: 'A fun, low-intensity ride for all ages — good filler when bigger Cars Land rides have long waits.',
    funFact: 'The ride vehicles are designed to look like spinning tractors, tying directly into Mater\'s character and backstory from the film.'
  },
  'dca-23': {
    description: 'A dark ride retelling The Little Mermaid\'s story through a series of colorful underwater-style scenes.',
    tip: 'A gentle, family-friendly ride with usually manageable waits — a good choice if you have younger kids in your group.',
    funFact: 'It uses similar dark ride and Audio-Animatronics technology to other classic Fantasyland-style rides, just built decades after the original Disneyland attractions it resembles.'
  },
  'dca-24': {
    description: 'A swinging ride that lifts riders in pairs high above Paradise Gardens Park, themed to a classic Silly Symphony cartoon.',
    tip: 'More intense than it first appears — the height and swinging motion combine to feel like more of a thrill ride than its cheerful theming suggests.',
    funFact: 'It\'s themed after a 1930s Silly Symphony short, one of the oldest pieces of source material used by any current Disney park ride.'
  },
  'dca-25': {
    description: 'A classic spinning rocket ride that lifts riders into a gentle arcing flight pattern above the boardwalk.',
    tip: 'A mellow, nostalgic ride — good for a slower-paced moment without much of a wait most of the day.',
    funFact: 'Its design pays homage to vintage 1920s amusement park "rocket" rides, fitting the retro boardwalk theming of Paradise Gardens Park.'
  },
  'dca-26': {
    description: 'A simple vertical drop ride themed to parachute jumping, lifting riders up before a quick, gentle descent.',
    tip: 'Mild compared to its name — a good introductory "thrill" ride for younger kids who aren\'t ready for bigger drop rides yet.',
    funFact: 'It\'s one of the gentlest "drop" style rides at any Disney park, designed specifically to ease younger guests into the sensation.'
  },
  'dca-27': {
    description: 'A classic carousel themed to Jessie from Toy Story, with horses replaced by Toy Story-themed animals and characters.',
    tip: 'A reliable, low-wait option for younger kids or anyone wanting a quick, simple ride between bigger attractions.',
    funFact: 'It was rethemed from an older sea-creature carousel called King Triton\'s Carousel of the Sea as part of the 2018 Pixar Pier transformation.'
  },
  'dca-28': {
    description: 'A spinning ride themed to the characters from Inside Out, where riders spin through a sequence representing different emotions.',
    tip: 'A straightforward spinner — skip it if you\'re prone to motion sickness and have already done a similar ride elsewhere in the park.',
    funFact: 'It was relocated and rethemed from a former A Bug\'s Land attraction called Flik\'s Flyers, given new Inside Out theming when it moved to Pixar Pier.'
  },
  'dca-29': {
    description: 'A walking and climbing area themed to a redwood forest, with rope bridges, climbing nets, and a slide for kids to explore freely.',
    tip: 'Great for letting kids burn off energy in a low-stakes way — there\'s no fixed ride cycle, so budget extra time if your group likes to linger.',
    funFact: 'It was designed in partnership with the National Park Service to highlight real conservation themes about California\'s redwood forests.'
  },
  'dca-12': {
    description: 'A series of rotating meet-and-greets with Avengers characters including Spider-Man, Black Panther, and others throughout Avengers Campus.',
    tip: 'Spider-Man\'s acrobatic stunt performances draw the biggest crowds — check showtimes if you want a guaranteed viewing spot.',
    funFact: 'Several of the Avengers performers are trained in actual parkour and stunt choreography, not just costumed meet-and-greet acting.'
  },
  'dca-13': {
    description: 'A themed shopping experience inside Avengers Campus selling Spider-Man and Avengers merchandise, gadgets, and props.',
    tip: 'A fun browse even if you\'re not buying — the in-universe theming throughout the shop is detailed enough to be worth a walk-through.',
    funFact: 'The shop\'s design ties directly into the fictional in-universe story of Avengers Campus training new recruits, rather than feeling like a generic gift shop.'
  },
  'dca-30': {
    description: 'A live character experience where Doctor Strange performs feats of "magic" at the Sanctum within Avengers Campus.',
    tip: 'Check posted showtimes — this is a scheduled live performance rather than a walk-up meet, so timing your visit matters.',
    funFact: 'The illusions performed are designed to tie directly into Doctor Strange\'s established powers from the Marvel films, rather than generic magic tricks.'
  },
  'dca-05': {
    description: 'A nighttime water, light, and fireworks show over Paradise Bay, with the current version themed to Encanto, Turning Red, and Inside Out as part of the resort\'s 70th anniversary celebration.',
    tip: 'A virtual queue is sometimes required for prime viewing areas — check the Disneyland app the morning of your visit for current entry details.',
    funFact: 'The show uses 1,200 fountains projecting onto water screens, with the choreography changing periodically as Disney rotates in new film themes over the years.'
  },
  'dca-14': {
    description: 'Short, surprise cavalcade-style parades featuring Pixar characters, popping up periodically throughout the day rather than running on a single fixed schedule.',
    tip: 'These are brief and spontaneous — catch one if you happen to be nearby rather than planning your whole day around a specific time.',
    funFact: 'Cavalcades became a regular feature across Disney parks after being introduced as a lower-contact alternative to traditional parades.'
  },
  'dca-31': {
    description: 'An interactive stage show in the Hyperion Theater where Mickey and friends set off on a musical adventure with audience participation throughout.',
    tip: 'Built for younger kids who like to sing and move along — a good pick if your group needs an energetic, kid-focused break.',
    funFact: 'It replaced Disney Junior Dance Party, continuing the Hyperion Theater\'s long history of hosting different family-focused stage shows over the years.'
  },
  'dca-32': {
    description: 'A roving jazz band that performs while driving a souped-up jalopy through Hollywood Land, playing upbeat live music throughout the day.',
    tip: 'A spontaneous bit of entertainment rather than a scheduled show — enjoy it if you happen to cross paths with them on Hollywood Land\'s main street.',
    funFact: 'The band\'s vintage car is a genuine, drivable vehicle dressed up with jazz-age styling to match the 1930s Hollywood theming of the land.'
  },
};
