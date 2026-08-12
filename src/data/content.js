export const DEFAULT_CONTENT = {
  site: {
    name: 'Trail Notes',
    tagline: 'A Landscape Blog',
    footer:
      'Trail Notes · A living landscape blog · Built with React, React Bits, and an afternoon with a horizon.',
    hero: {
      title: 'Five Days in the High Sierra',
      eyebrow: 'Trail Notes · August 2026',
      subtitle:
        'A field journal from the country above the tree line — where maps go empty and time goes slow.',
      ctaLabel: 'Read the Journal',
    },
    stats: [
      { label: 'Miles on foot', value: 47 },
      { label: 'Lakes visited', value: 12 },
      { label: 'Trail notes', value: 3 },
      { label: 'Sunrises kept', value: 5 },
    ],
    about: {
      heading: 'Who walks these pages',
      lead: 'Small stories from big open places.',
      body: 'Trail Notes is a field journal for anyone who has ever stood at a trailhead and felt the day ahead reorganize itself. Written by Mara Ellison, weekend wanderer and occasional professional, it collects the weather of particular places: the light, the quiet, the small arithmetic of walking up and walking down.',
    },
  },
  posts: [
    {
      id: 'high-sierra',
      title: 'Five Days in the High Sierra',
      date: 'August 11, 2026',
      readTime: '6 min read',
      excerpt:
        'Mornings of amber light, afternoons of thunder, evenings when the sky went the color of a bruise. A week on the crest between Onion Valley and the Kings River.',
      palette: 'dawn',
      tags: ['#hiking', '#sierra', '#backpacking', '#landscape'],
      blocks: [
        { type: 'lead', text: 'The trailhead empties into a valley that smells of pine sap and cold granite. By the time the first switchback appears, the city has already forgotten us.' },
        { type: 'paragraph', text: 'Every landscape has a rhythm if you sit still long enough to hear it. For five days I walked the Sierra crest between Onion Valley and the Kings River, and the mountains repaid the effort with a weather of moods: mornings of amber light, afternoons of thunder, evenings when the sky went the color of a bruise and the wind smelled of rain that never came.' },
        { type: 'paragraph', text: 'The plan was simple — carry less than a third of my body weight, walk when the sun was low, and camp near water. What the plan never accounted for was how the place would rearrange my sense of time. A mile on a map is one thing; a mile of talus and deadfall is an entirely different country.' },
        { type: 'heading', title: 'Camp One: The Pine Bench' },
        { type: 'paragraph', text: 'The first night we slept beneath a lodgepole pine that had been split by lightning sometime in the last century. Its charred half stood like a monument, and we set the tent in its shadow, reasoning that lightning rarely strikes the same tree twice — a folklore insurance policy that felt thin around 2 a.m., when the wind picked up and every crack of a branch read as a strike.' },
        { type: 'pullquote', text: "The wilderness doesn't test your strength. It tests your willingness to keep walking after you've already been shown how small you are." },
        { type: 'heading', title: 'Timberline and Beyond' },
        { type: 'paragraph', text: 'Above nine thousand feet, the trees thin out and the ground turns to gardens of cushion plants — moss campion, sky pilot, paintbrush burning red against the gravel. This is the country the maps render as empty. It is not empty. It is simply busy with small lives that don\'t care to be found.' },
        { type: 'figure', caption: 'Alpenglow over the ridge — a scene the camera never quite captures' },
        { type: 'paragraph', text: 'We crossed the pass at noon, and the wind on the far side hit like an open door. Below us, a basin of lakes arranged themselves like a staircase of mirrors, each one reflecting a slightly paler sky. It took an hour to descend what took three to climb, and that arithmetic — steep up, easy down — felt like a small lesson in how grief and joy both pass through a body.' },
        { type: 'blockquote', text: "Notes from the field journal, day three: ate lunch with my back against a sun-warmed boulder, watched a Clark's nutcracker steal a cracker, and understood, briefly, the appeal of owning nothing but a good jacket and a route." },
        { type: 'heading', title: 'What I Carried Home' },
        { type: 'list', items: ['A blister that healed into a badge', 'Three hundred photos of which the good ones were all taken at golden hour', 'A belief that the best seats in the house are unpaid', 'The correct way to hang a bear bag (finally)'] },
        { type: 'paragraph', text: 'The last morning we broke camp before light and walked out under a sky the color of old silver. The parking lot, when it finally appeared, smelled like exhaust and possibilities. I stood at the tailgate for a long minute, halfway to putting the boots away, halfway to turning around.' },
        { type: 'paragraph', text: 'The boots are still in the back of the car, actually. Just in case the season holds.' },
      ],
    },
    {
      id: 'alpine-lakes',
      title: 'Twelve Lakes, One Long Afternoon',
      date: 'July 19, 2026',
      readTime: '4 min read',
      excerpt:
        'A staircase of mirrors above the pass. Each lake reflected a slightly paler sky, and counting them became a kind of meditation.',
      palette: 'alpine',
      tags: ['#lakes', '#alpine', '#water'],
      blocks: [
        { type: 'lead', text: 'The basin holds twelve lakes, and I named none of them. Naming things, I have decided, is a way of taming them, and I wanted these to keep whatever wildness the altitude had left them.' },
        { type: 'paragraph', text: 'The climb starts at sunrise, when the trout are rising and the water is the temperature of snowmelt. By the second lake the trees have given up entirely, and the terrain becomes a conversation between granite and sky.' },
        { type: 'heading', title: 'The Arithmetic of Water' },
        { type: 'paragraph', text: 'Every lake above the pass is a weather system in miniature. I watched one go from glass to grey in under a minute as a cloud crossed the ridge, then settle back to glass just as quickly. Lake country teaches you to read the sky the way you would a tide chart.' },
        { type: 'blockquote', text: 'The talus field that morning was a lesson in patience: three steps up, two steps back, one very careful breath, repeat.' },
        { type: 'figure', caption: 'Still water at eleven thousand feet' },
        { type: 'pullquote', text: 'There is a particular blue that water turns when it has no memory of being anything else. I stood in it for what felt like a long time.' },
        { type: 'list', items: ['First lake — a mirror with trout', 'Eighth lake — the green one', 'Eleventh lake — where I ate the sandwich', 'Twelfth lake — where the afternoon turned'] },
      ],
    },
    {
      id: 'forest-light',
      title: 'What the Forest Does With Light',
      date: 'June 2, 2026',
      readTime: '3 min read',
      excerpt:
        'On walking slowly through a coast redwood grove and learning, finally, how to look up properly.',
      palette: 'forest',
      tags: ['#trees', '#quiet', '#slow'],
      blocks: [
        { type: 'lead', text: 'The forest does not ask you to hurry. It asks you to notice the particular quality of the light at four in the afternoon, when the canopy turns the sun into something poured.' },
        { type: 'paragraph', text: 'Redwoods are not trees so much as an argument about time. A grove instills a particular and humbling patience. To walk it slowly, hands in pockets, is to feel your own generosity with minutes improve.' },
        { type: 'heading', title: 'How to Look Up' },
        { type: 'paragraph', text: 'The naturalist taught me the trick: find a clearing, lie flat, and let your eyes go soft. The trunks become a single warm column of light. The canopy becomes a roof on fire. It is, objectively, the best way to spend an afternoon.' },
        { type: 'pullquote', text: 'Trees are slow weather. You have to stand still to feel them happening.' },
        { type: 'figure', caption: 'The canopy, from below' },
        { type: 'list', items: ['Woke with the light', 'Found a quiet bench', 'Reviewed the years ahead without urgency', 'Went home slower than I came'] },
      ],
    },
  ],
}

export const PALETTES = [
  { id: 'dawn', name: 'Dawn', stops: ['#9ec8e2', '#f2e2c3', '#3e6447'] },
  { id: 'alpine', name: 'Alpine', stops: ['#bcd9e8', '#eef5f2', '#5b7d9a'] },
  { id: 'forest', name: 'Forest', stops: ['#a8bfa0', '#e8dcc4', '#2c4a34'] },
  { id: 'desert', name: 'Desert', stops: ['#f2d0a4', '#e6b566', '#7a4f2d'] },
  { id: 'storm', name: 'Storm', stops: ['#8a97a8', '#d9c9b6', '#3a4654'] },
  { id: 'garden', name: 'Garden', stops: ['#cfe3c3', '#f4ecd8', '#4a7c59'] },
]