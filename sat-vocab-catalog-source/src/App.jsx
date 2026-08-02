import React, { useState, useMemo, useEffect } from "react";

/* ===================== WORD BANK ===================== */
// 300 SAT vocabulary words, organized into 15 study units of 20 words each.
const WORDS = [
// UNIT 1
{u:1,w:"abate",p:"v.",d:"to lessen in intensity or amount",e:"The storm began to abate by midnight, and the streets grew calm."},
{u:1,w:"aberrant",p:"adj.",d:"departing from what is normal or expected",e:"The teacher flagged the student's aberrant behavior as unusual for him."},
{u:1,w:"abscond",p:"v.",d:"to leave secretly, especially to escape",e:"The treasurer absconded with the club's funds before anyone noticed."},
{u:1,w:"abstain",p:"v.",d:"to hold oneself back voluntarily from something",e:"Two senators chose to abstain rather than vote yes or no."},
{u:1,w:"abstruse",p:"adj.",d:"difficult to understand; obscure",e:"The professor's abstruse lecture on quantum theory lost most of the class."},
{u:1,w:"acumen",p:"n.",d:"keen insight or shrewdness in a practical matter",e:"Her business acumen helped the startup survive its first hard year."},
{u:1,w:"adroit",p:"adj.",d:"clever or skillful in a physical or mental way",e:"The negotiator's adroit handling of the dispute impressed both sides."},
{u:1,w:"adulation",p:"n.",d:"excessive or slavish admiration",e:"The pop star grew uneasy with the fans' constant adulation."},
{u:1,w:"aesthetic",p:"adj./n.",d:"concerned with beauty or artistic taste",e:"The designer's minimalist aesthetic favored clean lines over ornamentation."},
{u:1,w:"affable",p:"adj.",d:"friendly and easy to talk to",e:"The affable host made every guest feel instantly welcome."},
{u:1,w:"alacrity",p:"n.",d:"brisk, cheerful readiness",e:"She agreed to help with such alacrity that no one doubted her enthusiasm."},
{u:1,w:"altruistic",p:"adj.",d:"showing unselfish concern for others' welfare",e:"His altruistic decision to donate a kidney surprised no one who knew him."},
{u:1,w:"ambiguous",p:"adj.",d:"open to more than one interpretation",e:"The contract's ambiguous wording led to a long legal dispute."},
{u:1,w:"ambivalent",p:"adj.",d:"having mixed or contradictory feelings",e:"He felt ambivalent about the promotion, torn between pride and dread."},
{u:1,w:"ameliorate",p:"v.",d:"to make a bad situation better",e:"New irrigation methods helped ameliorate the effects of the drought."},
{u:1,w:"amiable",p:"adj.",d:"having a friendly and pleasant manner",e:"Their amiable neighbor always waved and asked about their day."},
{u:1,w:"anachronistic",p:"adj.",d:"belonging to a period other than the one being depicted",e:"The knight's wristwatch was an anachronistic detail in the medieval film."},
{u:1,w:"analogous",p:"adj.",d:"comparable in certain respects",e:"The heart's function is analogous to that of a mechanical pump."},
{u:1,w:"anomaly",p:"n.",d:"something that deviates from what is standard",e:"The unusually cold reading turned out to be an anomaly, not a trend."},
{u:1,w:"antipathy",p:"n.",d:"a deep-seated feeling of dislike",e:"The rival coaches made no secret of their mutual antipathy."},
// UNIT 2
{u:2,w:"apathy",p:"n.",d:"lack of interest or concern",e:"Voter apathy in the district led to a record-low turnout."},
{u:2,w:"appease",p:"v.",d:"to pacify by satisfying demands",e:"The manager offered a refund to appease the frustrated customer."},
{u:2,w:"arbitrary",p:"adj.",d:"based on random choice rather than reason",e:"The fine seemed arbitrary since no clear rule explained the amount."},
{u:2,w:"arduous",p:"adj.",d:"involving great effort; difficult and tiring",e:"The arduous hike up the ridge took nearly six hours."},
{u:2,w:"articulate",p:"adj./v.",d:"able to express oneself clearly; to express clearly",e:"The articulate witness explained the accident in precise detail."},
{u:2,w:"ascetic",p:"adj./n.",d:"practicing strict self-denial as a spiritual discipline",e:"The monk lived an ascetic life, owning almost nothing."},
{u:2,w:"assiduous",p:"adj.",d:"showing great care and perseverance",e:"Her assiduous note-taking made studying for finals much easier."},
{u:2,w:"astute",p:"adj.",d:"having sharp judgment; shrewd",e:"An astute investor, she noticed the warning signs before the crash."},
{u:2,w:"audacious",p:"adj.",d:"showing bold, sometimes reckless daring",e:"The audacious heist was later turned into a Hollywood film."},
{u:2,w:"austere",p:"adj.",d:"severe or plain in appearance; strict",e:"The austere dorm room had only a bed, desk, and lamp."},
{u:2,w:"autonomous",p:"adj.",d:"acting independently; self-governing",e:"The province became autonomous after decades of negotiation."},
{u:2,w:"avarice",p:"n.",d:"extreme greed for wealth",e:"Avarice, not necessity, drove the merchant to cheat his partners."},
{u:2,w:"banal",p:"adj.",d:"lacking originality; boringly ordinary",e:"The film's banal dialogue made even the actors look bored."},
{u:2,w:"belie",p:"v.",d:"to give a false impression of",e:"Her calm expression belied the panic she felt inside."},
{u:2,w:"belligerent",p:"adj.",d:"hostile and aggressive",e:"The belligerent customer shouted at the cashier over a small mistake."},
{u:2,w:"benevolent",p:"adj.",d:"well-meaning and kindly",e:"The benevolent donor funded scholarships for first-generation students."},
{u:2,w:"bombastic",p:"adj.",d:"high-sounding but with little meaning; pompous",e:"The candidate's bombastic speech was full of promises but no plans."},
{u:2,w:"bolster",p:"v.",d:"to support or strengthen",e:"New evidence helped bolster the defense's argument."},
{u:2,w:"brevity",p:"n.",d:"concise and exact use of words",e:"The editor praised the brevity of the article's opening paragraph."},
{u:2,w:"cacophony",p:"n.",d:"a harsh, jarring mixture of sounds",e:"A cacophony of horns filled the gridlocked intersection."},
// UNIT 3
{u:3,w:"candor",p:"n.",d:"the quality of being open and honest",e:"Her candor about the company's losses surprised the shareholders."},
{u:3,w:"capitulate",p:"v.",d:"to give in; surrender",e:"After weeks of protest, the board finally capitulated to the demands."},
{u:3,w:"castigate",p:"v.",d:"to reprimand severely",e:"The editorial castigated the mayor for ignoring the water crisis."},
{u:3,w:"catalyst",p:"n.",d:"a person or thing that precipitates change",e:"The factory closing became the catalyst for the town's decline."},
{u:3,w:"caustic",p:"adj.",d:"sarcastic in a scathing way; corrosive",e:"His caustic remarks about her project left her stung for days."},
{u:3,w:"censure",p:"v./n.",d:"to express strong disapproval formally",e:"The senate voted to censure the official for his conduct."},
{u:3,w:"chicanery",p:"n.",d:"deception through trickery",e:"The scheme relied on legal chicanery to avoid the new tax."},
{u:3,w:"circumspect",p:"adj.",d:"cautious and unwilling to take risks",e:"She remained circumspect when reporters asked about the merger."},
{u:3,w:"clairvoyant",p:"adj./n.",d:"having insight beyond normal perception",e:"His clairvoyant prediction of the market crash proved eerily accurate."},
{u:3,w:"coalesce",p:"v.",d:"to come together to form one whole",e:"The scattered protests began to coalesce into a national movement."},
{u:3,w:"cogent",p:"adj.",d:"clear, logical, and convincing",e:"She made a cogent case for restructuring the budget."},
{u:3,w:"commensurate",p:"adj.",d:"corresponding in size or degree",e:"His salary was commensurate with his years of experience."},
{u:3,w:"complacent",p:"adj.",d:"self-satisfied and unaware of danger",e:"The champion grew complacent and lost to a far weaker opponent."},
{u:3,w:"compliant",p:"adj.",d:"disposed to agree with others or obey rules",e:"The new software update made the system compliant with the regulation."},
{u:3,w:"conciliatory",p:"adj.",d:"intended to placate or pacify",e:"He struck a conciliatory tone after the heated debate."},
{u:3,w:"condone",p:"v.",d:"to accept and allow behavior to continue",e:"The school will not condone any form of bullying."},
{u:3,w:"congenial",p:"adj.",d:"pleasant, agreeable, suited to one's needs",e:"The office had a congenial atmosphere where everyone helped each other."},
{u:3,w:"conjecture",p:"n./v.",d:"an opinion formed without complete evidence",e:"Without the missing records, the historian's account is mostly conjecture."},
{u:3,w:"connoisseur",p:"n.",d:"an expert judge in matters of taste",e:"As a connoisseur of jazz, he could name the drummer within seconds."},
{u:3,w:"contentious",p:"adj.",d:"causing or likely to cause disagreement",e:"Zoning reform remains a contentious issue at every town meeting."},
// UNIT 4
{u:4,w:"convoluted",p:"adj.",d:"extremely complex or intricate",e:"The instructions were so convoluted that no one assembled the shelf correctly."},
{u:4,w:"copious",p:"adj.",d:"abundant in supply or quantity",e:"She took copious notes during the three-hour lecture."},
{u:4,w:"corroborate",p:"v.",d:"to confirm or give support to a claim",e:"Two witnesses corroborated the driver's account of the accident."},
{u:4,w:"credulous",p:"adj.",d:"too ready to believe things; gullible",e:"The credulous investors ignored every warning sign about the scheme."},
{u:4,w:"cryptic",p:"adj.",d:"having a meaning that is mysterious or obscure",e:"His cryptic text left her wondering what he actually meant."},
{u:4,w:"cursory",p:"adj.",d:"hasty and therefore not thorough",e:"A cursory glance at the report missed the biggest error."},
{u:4,w:"cynical",p:"adj.",d:"distrustful of human sincerity or integrity",e:"Years in politics had made her cynical about campaign promises."},
{u:4,w:"daunting",p:"adj.",d:"seeming difficult to deal with in prospect",e:"The blank page felt daunting until she wrote the first sentence."},
{u:4,w:"dearth",p:"n.",d:"a scarcity or lack of something",e:"The rural clinic struggled with a dearth of trained nurses."},
{u:4,w:"debacle",p:"n.",d:"a sudden humiliating failure; a fiasco",e:"The product launch turned into a public relations debacle."},
{u:4,w:"decorum",p:"n.",d:"behavior in keeping with good taste and propriety",e:"The judge insisted on strict decorum in the courtroom."},
{u:4,w:"deference",p:"n.",d:"respectful submission to another's wishes",e:"The junior staff spoke with deference to the founding partner."},
{u:4,w:"deleterious",p:"adj.",d:"causing harm or damage",e:"Long-term stress can have deleterious effects on the heart."},
{u:4,w:"demure",p:"adj.",d:"reserved, modest, and shy",e:"She gave a demure smile before slipping out of the party early."},
{u:4,w:"deride",p:"v.",d:"to express contempt for; ridicule",e:"Critics derided the film's script as lazy and predictable."},
{u:4,w:"despot",p:"n.",d:"a ruler with absolute, often oppressive, power",e:"The despot silenced the press within weeks of taking power."},
{u:4,w:"desultory",p:"adj.",d:"lacking a plan or purpose; disconnected",e:"Their desultory conversation drifted from weather to politics to nothing."},
{u:4,w:"dexterous",p:"adj.",d:"skillful with the hands or mind",e:"The dexterous surgeon completed the delicate procedure in record time."},
{u:4,w:"didactic",p:"adj.",d:"intended to teach, often excessively moralizing",e:"The novel's didactic tone made it feel more like a lecture."},
{u:4,w:"diffident",p:"adj.",d:"modest or shy due to lack of self-confidence",e:"The diffident intern rarely spoke up during meetings."},
// UNIT 5
{u:5,w:"digress",p:"v.",d:"to leave the main subject temporarily",e:"The lecturer tended to digress into personal anecdotes."},
{u:5,w:"diligent",p:"adj.",d:"showing steady, earnest effort",e:"Her diligent research uncovered a source no one else had found."},
{u:5,w:"disdain",p:"n./v.",d:"the feeling that something is unworthy of respect",e:"He viewed the tabloids with open disdain."},
{u:5,w:"disparage",p:"v.",d:"to regard or describe as being of little worth",e:"The critic disparaged the sequel as a hollow cash grab."},
{u:5,w:"disparate",p:"adj.",d:"essentially different in kind; not comparable",e:"The committee struggled to unite such disparate viewpoints into one plan."},
{u:5,w:"dissonance",p:"n.",d:"a lack of harmony or agreement",e:"The chord's dissonance was resolved only in the final measure."},
{u:5,w:"divulge",p:"v.",d:"to make known private information",e:"The source refused to divulge her identity to the reporter."},
{u:5,w:"dogmatic",p:"adj.",d:"asserting opinions as if they were undeniably true",e:"His dogmatic insistence on one method shut down every alternative."},
{u:5,w:"dubious",p:"adj.",d:"hesitating or doubting; of questionable value",e:"She was dubious about the miracle cure advertised online."},
{u:5,w:"eccentric",p:"adj.",d:"unconventional and slightly strange",e:"The eccentric inventor kept dozens of half-finished gadgets in his garage."},
{u:5,w:"eclectic",p:"adj.",d:"deriving from a broad range of sources",e:"Her eclectic playlist moved from opera to punk without warning."},
{u:5,w:"edify",p:"v.",d:"to instruct or improve morally or intellectually",e:"The museum exhibit aimed to edify as much as entertain."},
{u:5,w:"effervescent",p:"adj.",d:"vivacious and enthusiastic; bubbly",e:"Her effervescent personality lit up every room she entered."},
{u:5,w:"egregious",p:"adj.",d:"outstandingly bad; shocking",e:"The report revealed an egregious error in the safety inspection."},
{u:5,w:"elicit",p:"v.",d:"to draw out a response or reaction",e:"The survey was designed to elicit honest feedback from employees."},
{u:5,w:"eloquent",p:"adj.",d:"fluent and persuasive in speaking or writing",e:"Her eloquent closing argument swayed the entire jury."},
{u:5,w:"elusive",p:"adj.",d:"difficult to find, catch, or achieve",e:"A cure for the disease remained elusive for decades."},
{u:5,w:"emulate",p:"v.",d:"to imitate in order to equal or surpass",e:"Young players try to emulate the footwork of the veteran star."},
{u:5,w:"enervate",p:"v.",d:"to weaken or drain of energy",e:"The oppressive heat enervated the hikers by midday."},
{u:5,w:"enigmatic",p:"adj.",d:"mysterious and difficult to understand",e:"The painting's enigmatic smile has puzzled viewers for centuries."},
// UNIT 6
{u:6,w:"ephemeral",p:"adj.",d:"lasting for a very short time",e:"The cherry blossoms' ephemeral beauty draws crowds every spring."},
{u:6,w:"equanimity",p:"n.",d:"mental calmness in difficult situations",e:"She accepted the harsh news with surprising equanimity."},
{u:6,w:"equivocal",p:"adj.",d:"open to more than one interpretation; ambiguous",e:"His equivocal answer left the reporters more confused than before."},
{u:6,w:"erudite",p:"adj.",d:"having or showing great knowledge",e:"The erudite professor could quote three languages in a single lecture."},
{u:6,w:"esoteric",p:"adj.",d:"understood by only a small, specialized group",e:"The seminar covered esoteric topics in medieval manuscript restoration."},
{u:6,w:"euphemism",p:"n.",d:"a mild expression substituted for a harsh one",e:"'Passed away' is a common euphemism for 'died.'"},
{u:6,w:"exacerbate",p:"v.",d:"to make a problem worse",e:"Cutting the counseling budget will only exacerbate student stress."},
{u:6,w:"exemplary",p:"adj.",d:"serving as a desirable model; outstanding",e:"Her exemplary conduct earned her the department's top honor."},
{u:6,w:"exonerate",p:"v.",d:"to clear of blame or guilt",e:"New DNA evidence exonerated the man after twenty years in prison."},
{u:6,w:"expedient",p:"adj./n.",d:"convenient and practical, though possibly improper",e:"Shortcuts seemed expedient at first but caused problems later."},
{u:6,w:"extol",p:"v.",d:"to praise enthusiastically",e:"The coach extolled the rookie's work ethic in every interview."},
{u:6,w:"facetious",p:"adj.",d:"treating serious issues with inappropriate humor",e:"His facetious comment during the safety briefing annoyed the instructor."},
{u:6,w:"fallacious",p:"adj.",d:"based on a mistaken belief; logically unsound",e:"The ad relied on a fallacious comparison to a leading brand."},
{u:6,w:"fastidious",p:"adj.",d:"very attentive to detail; hard to please",e:"The fastidious editor caught every misplaced comma in the draft."},
{u:6,w:"fervent",p:"adj.",d:"having or showing intense feeling",e:"The fervent crowd chanted for an encore long after the show ended."},
{u:6,w:"flagrant",p:"adj.",d:"conspicuously bad; blatant",e:"The referee called a flagrant foul after the hard shove."},
{u:6,w:"flippant",p:"adj.",d:"not showing serious or respectful attention",e:"His flippant reply to the judge did not help his case."},
{u:6,w:"fortuitous",p:"adj.",d:"happening by chance, often luckily",e:"A fortuitous meeting at the conference led to their partnership."},
{u:6,w:"fraudulent",p:"adj.",d:"obtained or done by deception; dishonest",e:"The auditor uncovered fraudulent entries in the company's ledger."},
{u:6,w:"frugal",p:"adj.",d:"economical in use of resources; thrifty",e:"Their frugal habits let them save half of every paycheck."},
// UNIT 7
{u:7,w:"furtive",p:"adj.",d:"attempting to avoid notice; secretive",e:"He cast a furtive glance at his phone during the meeting."},
{u:7,w:"garrulous",p:"adj.",d:"excessively talkative, especially about trivial matters",e:"The garrulous cab driver talked the entire ride without pausing."},
{u:7,w:"gratuitous",p:"adj.",d:"uncalled for; unjustified",e:"Critics called the film's violence gratuitous and unnecessary."},
{u:7,w:"gregarious",p:"adj.",d:"fond of company; sociable",e:"Her gregarious nature made her the center of every gathering."},
{u:7,w:"guile",p:"n.",d:"sly or cunning intelligence; deceit",e:"He won the negotiation through patience rather than guile."},
{u:7,w:"hackneyed",p:"adj.",d:"overused and unoriginal; clichéd",e:"The reviewer criticized the plot's hackneyed twist ending."},
{u:7,w:"haughty",p:"adj.",d:"arrogantly superior and disdainful",e:"The haughty waiter sneered at their simple order."},
{u:7,w:"hedonist",p:"n.",d:"a person who pursues pleasure as life's chief goal",e:"His friends joked that he lived like a hedonist on weekends."},
{u:7,w:"heresy",p:"n.",d:"a belief contrary to established doctrine",e:"His theory was dismissed as scientific heresy at the time."},
{u:7,w:"hyperbole",p:"n.",d:"exaggerated statements not meant to be taken literally",e:"Calling the line 'a million miles long' was pure hyperbole."},
{u:7,w:"iconoclast",p:"n.",d:"a person who attacks cherished beliefs or institutions",e:"The artist built her career as an iconoclast of tradition."},
{u:7,w:"idiosyncrasy",p:"n.",d:"a peculiar habit or feature of a person",e:"One idiosyncrasy of his was numbering every pencil on his desk."},
{u:7,w:"impartial",p:"adj.",d:"treating all sides equally; unbiased",e:"The mediator remained impartial throughout the heated dispute."},
{u:7,w:"impervious",p:"adj.",d:"unable to be affected by something",e:"Years of criticism had left the veteran coach impervious to insults."},
{u:7,w:"impetuous",p:"adj.",d:"acting quickly without thought or care",e:"His impetuous decision to quit cost him a stable career."},
{u:7,w:"implacable",p:"adj.",d:"unable to be appeased or calmed",e:"The implacable critic found fault with every restaurant she reviewed."},
{u:7,w:"implicit",p:"adj.",d:"implied though not plainly expressed",e:"There was an implicit understanding that latecomers would pay the tab."},
{u:7,w:"impudent",p:"adj.",d:"disrespectful or bold in a rude way",e:"The impudent intern corrected the CEO in front of the board."},
{u:7,w:"inadvertent",p:"adj.",d:"unintentional; done by accident",e:"The typo was an inadvertent error, not a deliberate change."},
{u:7,w:"incessant",p:"adj.",d:"continuing without pause or interruption",e:"The incessant construction noise made it impossible to focus."},
// UNIT 8
{u:8,w:"incongruous",p:"adj.",d:"not in harmony or keeping with the surroundings",e:"The skyscraper looked incongruous next to the old stone chapel."},
{u:8,w:"inconsequential",p:"adj.",d:"of little importance; insignificant",e:"He dismissed the delay as an inconsequential setback."},
{u:8,w:"indifferent",p:"adj.",d:"having no particular interest or concern",e:"The cat remained indifferent to the barking dog outside."},
{u:8,w:"indigenous",p:"adj.",d:"originating naturally in a particular place",e:"The festival celebrates music indigenous to the region."},
{u:8,w:"indolent",p:"adj.",d:"wanting to avoid activity; lazy",e:"The indolent cat spent the entire afternoon in the sun."},
{u:8,w:"ineffable",p:"adj.",d:"too great to be expressed in words",e:"She described the sunrise over the canyon as ineffable."},
{u:8,w:"inept",p:"adj.",d:"having no skill; clumsy",e:"His inept attempt at repairs left the sink leaking worse than before."},
{u:8,w:"inevitable",p:"adj.",d:"certain to happen; unavoidable",e:"Given the debt, bankruptcy seemed inevitable within the year."},
{u:8,w:"ingenuous",p:"adj.",d:"innocent and unsuspecting; naive",e:"His ingenuous trust in strangers worried his parents."},
{u:8,w:"inherent",p:"adj.",d:"existing as a natural or basic part of something",e:"Risk is inherent in any new business venture."},
{u:8,w:"innocuous",p:"adj.",d:"not harmful or offensive",e:"What seemed like an innocuous comment started a heated argument."},
{u:8,w:"insipid",p:"adj.",d:"lacking flavor or interest; bland",e:"The soup was insipid, missing any hint of seasoning."},
{u:8,w:"insolent",p:"adj.",d:"showing disrespectful rudeness",e:"The insolent reply earned the student a trip to the office."},
{u:8,w:"intransigent",p:"adj.",d:"unwilling to change one's views or agree",e:"The union and management remained intransigent through three rounds of talks."},
{u:8,w:"intrepid",p:"adj.",d:"fearless and adventurous",e:"The intrepid explorer crossed the glacier alone."},
{u:8,w:"inundate",p:"v.",d:"to overwhelm with large amounts of something",e:"The office was inundated with complaints after the price change."},
{u:8,w:"inveterate",p:"adj.",d:"having a long-standing habit; deeply ingrained",e:"He remained an inveterate collector of old vinyl records."},
{u:8,w:"irascible",p:"adj.",d:"easily angered; quick-tempered",e:"The irascible chef fired two line cooks in a single shift."},
{u:8,w:"jubilant",p:"adj.",d:"feeling or expressing great happiness",e:"The jubilant fans flooded the streets after the championship win."},
{u:8,w:"juxtapose",p:"v.",d:"to place side by side for contrasting effect",e:"The exhibit juxtaposes photos from 1950 with the same streets today."},
// UNIT 9
{u:9,w:"laconic",p:"adj.",d:"using very few words; terse",e:"His laconic reply of 'sure' hardly answered her question."},
{u:9,w:"lament",p:"v./n.",d:"to express sorrow or regret",e:"Neighbors lamented the loss of the century-old oak tree."},
{u:9,w:"languid",p:"adj.",d:"lacking energy; slow and relaxed",e:"They spent a languid afternoon on the porch, doing nothing at all."},
{u:9,w:"latent",p:"adj.",d:"present but not yet developed or visible",e:"The test revealed a latent talent for music no one had noticed."},
{u:9,w:"lethargic",p:"adj.",d:"lacking energy; sluggish",e:"The heat left the entire office feeling lethargic by noon."},
{u:9,w:"lucid",p:"adj.",d:"clear and easy to understand",e:"Her lucid explanation cleared up months of confusion in minutes."},
{u:9,w:"magnanimous",p:"adj.",d:"generous or forgiving, especially toward a rival",e:"The champion was magnanimous in victory, praising her opponent's skill."},
{u:9,w:"malleable",p:"adj.",d:"easily influenced or shaped",e:"Young children have minds that are highly malleable."},
{u:9,w:"mediocre",p:"adj.",d:"of only average quality; not very good",e:"The reviews called the sequel mediocre at best."},
{u:9,w:"meticulous",p:"adj.",d:"showing great attention to detail",e:"His meticulous records made the audit go smoothly."},
{u:9,w:"mitigate",p:"v.",d:"to make less severe or serious",e:"Sandbags helped mitigate the damage from the flood."},
{u:9,w:"mollify",p:"v.",d:"to calm or soothe an angry person",e:"The manager tried to mollify the customer with a refund."},
{u:9,w:"morose",p:"adj.",d:"sullen and ill-tempered",e:"He grew morose after losing the final match."},
{u:9,w:"mundane",p:"adj.",d:"lacking excitement; ordinary",e:"Her mundane commute felt endless every single morning."},
{u:9,w:"myriad",p:"adj./n.",d:"a countless or extremely great number",e:"The city offers a myriad of restaurants to choose from."},
{u:9,w:"nebulous",p:"adj.",d:"unclear, vague, or ill-defined",e:"The plan remained nebulous until the final budget meeting."},
{u:9,w:"nefarious",p:"adj.",d:"wicked or criminal",e:"The film's villain hatched a nefarious plot to flood the city."},
{u:9,w:"negligent",p:"adj.",d:"failing to take proper care; careless",e:"The court found the company negligent in maintaining the equipment."},
{u:9,w:"neophyte",p:"n.",d:"a person new to a field or activity",e:"As a neophyte coder, she still relied heavily on tutorials."},
{u:9,w:"nonchalant",p:"adj.",d:"calm and unconcerned; casual",e:"He stayed nonchalant even as the deadline approached."},
// UNIT 10
{u:10,w:"nostalgia",p:"n.",d:"sentimental longing for the past",e:"The old photographs filled her with nostalgia for childhood summers."},
{u:10,w:"notorious",p:"adj.",d:"famous for some bad quality or deed",e:"The bridge is notorious for its heavy traffic during rush hour."},
{u:10,w:"novice",p:"n.",d:"a person new to a skill or activity",e:"The novice skier stuck to the beginner slopes all day."},
{u:10,w:"nuance",p:"n.",d:"a subtle difference in meaning or expression",e:"The translator worked hard to preserve every nuance of the poem."},
{u:10,w:"obdurate",p:"adj.",d:"stubbornly refusing to change one's mind",e:"He remained obdurate despite the mounting evidence against him."},
{u:10,w:"obfuscate",p:"v.",d:"to make unclear or difficult to understand",e:"The report seemed designed to obfuscate the company's real losses."},
{u:10,w:"obscure",p:"adj./v.",d:"not well known; to make unclear",e:"The band remained obscure until a viral video changed everything."},
{u:10,w:"obsequious",p:"adj.",d:"excessively eager to please or obey",e:"The obsequious waiter hovered at their table all night."},
{u:10,w:"obsolete",p:"adj.",d:"no longer produced or used; out of date",e:"The old software became obsolete after the new update launched."},
{u:10,w:"obstinate",p:"adj.",d:"stubbornly refusing to change one's opinion",e:"The obstinate mule wouldn't budge no matter how hard they pulled."},
{u:10,w:"officious",p:"adj.",d:"assertive of authority in an annoying way",e:"The officious clerk demanded three forms of ID for a simple return."},
{u:10,w:"ominous",p:"adj.",d:"giving the impression that something bad will happen",e:"An ominous silence fell over the crowd before the announcement."},
{u:10,w:"opaque",p:"adj.",d:"not able to be seen through; unclear",e:"The company's pricing structure remained opaque to most customers."},
{u:10,w:"opulent",p:"adj.",d:"showing great wealth; luxurious",e:"The hotel lobby was opulent, with marble floors and gold trim."},
{u:10,w:"ostentatious",p:"adj.",d:"designed to impress; showy",e:"His ostentatious display of wealth made the other guests uncomfortable."},
{u:10,w:"ostracize",p:"v.",d:"to exclude someone from a group",e:"The team began to ostracize the player after the incident."},
{u:10,w:"paradox",p:"n.",d:"a statement that seems contradictory but may be true",e:"It's a paradox that the busiest people often have the most free time."},
{u:10,w:"paramount",p:"adj.",d:"more important than anything else; supreme",e:"Safety was paramount during the construction of the new bridge."},
{u:10,w:"parody",p:"n.",d:"an imitation created for comic effect",e:"The sketch was a parody of famous superhero movies."},
{u:10,w:"paucity",p:"n.",d:"the presence of something only in small quantities",e:"A paucity of evidence forced the jury to acquit."},
// UNIT 11
{u:11,w:"pedantic",p:"adj.",d:"overly concerned with minor details or rules",e:"His pedantic corrections of grammar annoyed the entire group chat."},
{u:11,w:"perfunctory",p:"adj.",d:"carried out with minimum effort or reflection",e:"The clerk gave a perfunctory nod before returning to her phone."},
{u:11,w:"perpetuate",p:"v.",d:"to make something continue indefinitely",e:"The policy only perpetuated the cycle it was meant to break."},
{u:11,w:"pervasive",p:"adj.",d:"spreading widely throughout an area",e:"Smartphone use has become pervasive in nearly every classroom."},
{u:11,w:"petulant",p:"adj.",d:"childishly sulky or bad-tempered",e:"The petulant toddler threw his toy across the room."},
{u:11,w:"philanthropic",p:"adj.",d:"seeking to promote the welfare of others; charitable",e:"The foundation's philanthropic work funds clinics across three states."},
{u:11,w:"placate",p:"v.",d:"to make someone less angry; appease",e:"The airline offered vouchers to placate the delayed passengers."},
{u:11,w:"plausible",p:"adj.",d:"seeming reasonable or probable",e:"Her alibi sounded plausible, but the detective kept digging."},
{u:11,w:"plethora",p:"n.",d:"a large or excessive amount of something",e:"The menu offered a plethora of options for every diet."},
{u:11,w:"poignant",p:"adj.",d:"evoking a keen sense of sadness or regret",e:"The film's final scene was quietly poignant."},
{u:11,w:"pragmatic",p:"adj.",d:"dealing with things sensibly and practically",e:"Rather than argue theory, she offered a pragmatic solution."},
{u:11,w:"precarious",p:"adj.",d:"not securely held; dangerously uncertain",e:"The ladder's precarious balance made him hesitate before climbing."},
{u:11,w:"precocious",p:"adj.",d:"showing advanced development at an early age",e:"The precocious eight-year-old was already reading college-level novels."},
{u:11,w:"preponderance",p:"n.",d:"the quality of being greater in number or importance",e:"A preponderance of evidence pointed to the same suspect."},
{u:11,w:"prescient",p:"adj.",d:"having knowledge of events before they happen",e:"Her prescient warning about the market went unheeded for years."},
{u:11,w:"pretentious",p:"adj.",d:"attempting to impress by claiming more importance than is deserved",e:"The reviewer found the restaurant's menu pretentious and overpriced."},
{u:11,w:"prodigal",p:"adj.",d:"wastefully extravagant",e:"The prodigal heir spent his inheritance within two years."},
{u:11,w:"prodigious",p:"adj.",d:"remarkably great in size or degree",e:"The young pianist showed prodigious talent by age six."},
{u:11,w:"profound",p:"adj.",d:"very great or intense; showing deep insight",e:"The loss had a profound effect on the entire community."},
{u:11,w:"proliferate",p:"v.",d:"to increase rapidly in number",e:"Streaming services began to proliferate throughout the decade."},
// UNIT 12
{u:12,w:"propensity",p:"n.",d:"an inclination or natural tendency",e:"He has a propensity for taking on too many projects at once."},
{u:12,w:"prosaic",p:"adj.",d:"lacking imagination; dull and ordinary",e:"The report's prosaic style made an exciting discovery sound tedious."},
{u:12,w:"provincial",p:"adj.",d:"narrow-minded or unsophisticated; of a region outside the capital",e:"His provincial views on fashion drew laughter from his city cousins."},
{u:12,w:"prudent",p:"adj.",d:"acting with care and thought for the future",e:"A prudent investor keeps some savings in low-risk accounts."},
{u:12,w:"pugnacious",p:"adj.",d:"eager to argue or fight",e:"The pugnacious commentator interrupted every guest on the panel."},
{u:12,w:"quandary",p:"n.",d:"a state of uncertainty over what to do",e:"She was in a quandary about which college offer to accept."},
{u:12,w:"querulous",p:"adj.",d:"complaining in a whining manner",e:"The querulous passenger complained about every seat on the flight."},
{u:12,w:"quixotic",p:"adj.",d:"extremely idealistic and unrealistic",e:"His quixotic plan to end traffic overnight went nowhere."},
{u:12,w:"rancor",p:"n.",d:"bitterness or resentfulness",e:"Years of rancor between the neighbors began over a fence."},
{u:12,w:"recalcitrant",p:"adj.",d:"stubbornly resistant to authority or guidance",e:"The recalcitrant witness refused to answer even simple questions."},
{u:12,w:"reciprocate",p:"v.",d:"to respond to an action with a similar one",e:"She reciprocated his kindness by helping move his furniture."},
{u:12,w:"reclusive",p:"adj.",d:"avoiding the company of others",e:"The reclusive author hadn't given an interview in a decade."},
{u:12,w:"refute",p:"v.",d:"to prove a statement or theory to be wrong",e:"New data quickly refuted the study's original conclusion."},
{u:12,w:"relegate",p:"v.",d:"to assign to a lower or less important position",e:"The veteran player was relegated to the bench after his injury."},
{u:12,w:"remorse",p:"n.",d:"deep regret for a wrong committed",e:"He showed genuine remorse for the harm his words had caused."},
{u:12,w:"reticent",p:"adj.",d:"not revealing one's thoughts or feelings readily",e:"She stayed reticent about her plans until everything was finalized."},
{u:12,w:"reverent",p:"adj.",d:"feeling or showing deep respect",e:"The audience fell into reverent silence as the choir began."},
{u:12,w:"rhetoric",p:"n.",d:"language designed to have a persuasive effect",e:"The senator's rhetoric was stirring but light on specifics."},
{u:12,w:"sagacious",p:"adj.",d:"showing keen mental discernment; wise",e:"The sagacious old teacher predicted the outcome long before anyone else."},
{u:12,w:"sanguine",p:"adj.",d:"optimistic, especially in a difficult situation",e:"Despite the setback, she remained sanguine about the project's future."},
// UNIT 13
{u:13,w:"scrupulous",p:"adj.",d:"diligent, thorough, and extremely careful",e:"He kept scrupulous records of every expense on the trip."},
{u:13,w:"scrutinize",p:"v.",d:"to examine closely and critically",e:"Auditors scrutinized every receipt before approving the budget."},
{u:13,w:"sedentary",p:"adj.",d:"characterized by sitting; not physically active",e:"Her sedentary desk job left little room for exercise."},
{u:13,w:"serendipity",p:"n.",d:"the occurrence of fortunate discoveries by chance",e:"Meeting her future business partner at the airport was pure serendipity."},
{u:13,w:"skeptic",p:"n.",d:"a person inclined to question accepted opinions",e:"As a skeptic, he demanded proof before believing the rumor."},
{u:13,w:"solace",p:"n.",d:"comfort in a time of distress",e:"She found solace in long walks after the loss."},
{u:13,w:"solicitous",p:"adj.",d:"showing eager concern or attentiveness",e:"The solicitous nurse checked on the patient every hour."},
{u:13,w:"sparse",p:"adj.",d:"thinly scattered or distributed; meager",e:"The desert's sparse vegetation could barely support the small herd."},
{u:13,w:"spurious",p:"adj.",d:"not genuine; based on false reasoning",e:"The study's spurious correlation didn't hold up under review."},
{u:13,w:"squander",p:"v.",d:"to waste resources carelessly",e:"He squandered his savings on a business that never opened."},
{u:13,w:"stoic",p:"adj./n.",d:"enduring hardship without complaint",e:"She remained stoic through the entire painful recovery."},
{u:13,w:"stringent",p:"adj.",d:"strict and precisely enforced",e:"The lab followed stringent safety protocols at all times."},
{u:13,w:"subjective",p:"adj.",d:"based on personal feelings rather than facts",e:"Taste in music is entirely subjective."},
{u:13,w:"sublime",p:"adj.",d:"of such excellence as to inspire awe",e:"The view from the summit was simply sublime."},
{u:13,w:"subtle",p:"adj.",d:"delicate or precise; not obvious",e:"A subtle shift in her tone hinted at bad news."},
{u:13,w:"succinct",p:"adj.",d:"briefly and clearly expressed",e:"His succinct summary saved the committee an hour of discussion."},
{u:13,w:"superficial",p:"adj.",d:"existing on the surface; not thorough",e:"The article gave only a superficial look at the policy's effects."},
{u:13,w:"superfluous",p:"adj.",d:"unnecessary, especially through being more than enough",e:"The report's final chapter felt superfluous and repetitive."},
{u:13,w:"surreptitious",p:"adj.",d:"kept secret because it would not be approved of",e:"He took a surreptitious peek at the answer key."},
{u:13,w:"sycophant",p:"n.",d:"a person who flatters others to gain advantage",e:"The executive surrounded himself with sycophants who never disagreed."},
// UNIT 14
{u:14,w:"tacit",p:"adj.",d:"understood without being stated openly",e:"Their tacit agreement meant neither had to say it aloud."},
{u:14,w:"tangential",p:"adj.",d:"only slightly connected to the main topic",e:"His tangential remark had nothing to do with the meeting's agenda."},
{u:14,w:"tenacious",p:"adj.",d:"holding firmly to a course of action; persistent",e:"Her tenacious pursuit of the story led to the exposé."},
{u:14,w:"tenuous",p:"adj.",d:"very weak or slight; barely sufficient",e:"The link between the two studies was tenuous at best."},
{u:14,w:"terse",p:"adj.",d:"sparing in the use of words; abrupt",e:"His terse reply suggested he didn't want to discuss it further."},
{u:14,w:"torpid",p:"adj.",d:"mentally or physically inactive; sluggish",e:"The bears grew torpid as winter approached."},
{u:14,w:"tractable",p:"adj.",d:"easy to control or influence",e:"The new hire proved far more tractable than the last one."},
{u:14,w:"transient",p:"adj.",d:"lasting only for a short time",e:"The joy of the win felt transient once the season ended."},
{u:14,w:"trepidation",p:"n.",d:"a feeling of fear or anxiety about something",e:"She approached the interview with a mix of hope and trepidation."},
{u:14,w:"trivial",p:"adj.",d:"of little value or importance",e:"He got upset over a trivial mistake in the schedule."},
{u:14,w:"truculent",p:"adj.",d:"eager to argue or fight; fierce",e:"The truculent customer refused to lower his voice."},
{u:14,w:"ubiquitous",p:"adj.",d:"present, appearing, or found everywhere",e:"Smartphones have become ubiquitous in daily life."},
{u:14,w:"undermine",p:"v.",d:"to weaken gradually or insidiously",e:"Constant criticism began to undermine her confidence."},
{u:14,w:"unprecedented",p:"adj.",d:"never done or known before",e:"The storm caused unprecedented flooding across the valley."},
{u:14,w:"unscrupulous",p:"adj.",d:"having no moral principles; dishonest",e:"The unscrupulous landlord ignored every repair request for months."},
{u:14,w:"urbane",p:"adj.",d:"courteous and refined in manner",e:"His urbane manner made him a favorite at diplomatic events."},
{u:14,w:"utilitarian",p:"adj.",d:"designed to be useful rather than attractive",e:"The building's utilitarian design prioritized function over beauty."},
{u:14,w:"vacillate",p:"v.",d:"to waver between different opinions or actions",e:"He vacillated between the two job offers for a week."},
{u:14,w:"venerable",p:"adj.",d:"accorded great respect due to age or wisdom",e:"The venerable professor had taught three generations of students."},
{u:14,w:"veracity",p:"n.",d:"conformity to facts; truthfulness",e:"The editor questioned the veracity of the anonymous tip."},
// UNIT 15
{u:15,w:"verbose",p:"adj.",d:"using more words than needed",e:"His verbose email buried the one important detail in paragraphs."},
{u:15,w:"vindicate",p:"v.",d:"to clear of blame; to justify",e:"The test results ultimately vindicated her original hypothesis."},
{u:15,w:"vindictive",p:"adj.",d:"having a strong desire for revenge",e:"His vindictive response to the review surprised the small business owner."},
{u:15,w:"virtuoso",p:"n.",d:"a person highly skilled in a particular field",e:"The young violinist performed like a true virtuoso."},
{u:15,w:"visceral",p:"adj.",d:"relating to deep, instinctive feelings",e:"The horror film provoked a visceral reaction from the audience."},
{u:15,w:"vociferous",p:"adj.",d:"vehement or loud in expression",e:"A vociferous group of fans protested outside the stadium."},
{u:15,w:"volatile",p:"adj.",d:"liable to change rapidly and unpredictably",e:"The volatile stock swung ten percent in a single day."},
{u:15,w:"voracious",p:"adj.",d:"having a very eager approach to an activity",e:"She's a voracious reader, finishing a novel almost every week."},
{u:15,w:"wary",p:"adj.",d:"feeling caution about possible danger",e:"He stayed wary of the too-good-to-be-true offer."},
{u:15,w:"whimsical",p:"adj.",d:"playfully quaint or fanciful",e:"The children's book was full of whimsical illustrations."},
{u:15,w:"zealous",p:"adj.",d:"having great energy in pursuit of a cause",e:"The zealous volunteers canvassed the entire neighborhood in one day."},
{u:15,w:"zenith",p:"n.",d:"the time at which something is most powerful",e:"The band reached its zenith with their third album."},
{u:15,w:"abrogate",p:"v.",d:"to repeal or do away with formally",e:"The new government moved to abrogate the old trade agreement."},
{u:15,w:"acrimonious",p:"adj.",d:"bitter and sharp in tone",e:"The acrimonious divorce dragged on for nearly two years."},
{u:15,w:"brusque",p:"adj.",d:"abrupt or curt in manner",e:"His brusque reply left little room for further discussion."},
{u:15,w:"capricious",p:"adj.",d:"given to sudden changes of mood or behavior",e:"The capricious weather ruined three separate picnic plans."},
{u:15,w:"deft",p:"adj.",d:"neatly skillful and quick",e:"With a deft flick of the wrist, she landed the trick."},
{u:15,w:"exigent",p:"adj.",d:"pressing; demanding immediate attention",e:"The hospital treated the exigent cases before anything else."},
{u:15,w:"impecunious",p:"adj.",d:"having little or no money",e:"The impecunious student survived mostly on instant noodles."},
{u:15,w:"pellucid",p:"adj.",d:"translucently clear in style or meaning",e:"Her pellucid prose made even the dense topic easy to follow."},
];

const TOTAL_UNITS = 15;

function catalogNumber(unit, index) {
  return `${String(unit).padStart(2, "0")}.${String(index + 1).padStart(2, "0")}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeQuizQuestion(word, pool) {
  const distractors = shuffle(pool.filter((w) => w.w !== word.w)).slice(0, 3);
  const options = shuffle([word, ...distractors]);
  return { word, options };
}

export default function App() {
  const [mode, setMode] = useState("browse"); // browse | flash | quiz
  const [activeUnit, setActiveUnit] = useState(1);
  const [search, setSearch] = useState("");
  const [flipped, setFlipped] = useState({});
  const [known, setKnown] = useState({});
  const [review, setReview] = useState({});

  const [flashIndex, setFlashIndex] = useState(0);
  const [flashFace, setFlashFace] = useState("front");

  const [quizPool, setQuizPool] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizQ, setQuizQ] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  const unitWords = useMemo(
    () => WORDS.filter((w) => w.u === activeUnit),
    [activeUnit]
  );

  const searchResults = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.trim().toLowerCase();
    return WORDS.filter(
      (w) => w.w.toLowerCase().includes(q) || w.d.toLowerCase().includes(q)
    );
  }, [search]);

  const totalKnown = Object.values(known).filter(Boolean).length;
  const totalReview = Object.values(review).filter(Boolean).length;

  function toggleFlip(key) {
    setFlipped((f) => ({ ...f, [key]: !f[key] }));
  }

  function markKnown(key) {
    setKnown((k) => ({ ...k, [key]: true }));
    setReview((r) => ({ ...r, [key]: false }));
  }
  function markReview(key) {
    setReview((r) => ({ ...r, [key]: true }));
    setKnown((k) => ({ ...k, [key]: false }));
  }

  function startFlash(unit) {
    setActiveUnit(unit);
    setFlashIndex(0);
    setFlashFace("front");
    setMode("flash");
  }

  function nextFlash(dir) {
    setFlashFace("front");
    setFlashIndex((i) => {
      const n = i + dir;
      if (n < 0) return unitWords.length - 1;
      if (n >= unitWords.length) return 0;
      return n;
    });
  }

  function startQuiz(unit) {
    const pool = WORDS.filter((w) => w.u === unit);
    const shuffled = shuffle(pool);
    setQuizPool(shuffled);
    setQuizIndex(0);
    setQuizQ(makeQuizQuestion(shuffled[0], pool));
    setQuizAnswer(null);
    setQuizScore({ correct: 0, total: 0 });
    setActiveUnit(unit);
    setMode("quiz");
  }

  function answerQuiz(opt) {
    if (quizAnswer) return;
    const correct = opt.w === quizQ.word.w;
    setQuizAnswer({ picked: opt.w, correct });
    setQuizScore((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      total: s.total + 1,
    }));
  }

  function nextQuiz() {
    const ni = quizIndex + 1;
    if (ni >= quizPool.length) {
      setQuizQ(null);
      setQuizIndex(ni);
      return;
    }
    setQuizIndex(ni);
    setQuizQ(makeQuizQuestion(quizPool[ni], quizPool));
    setQuizAnswer(null);
  }

  useEffect(() => {
    setFlashIndex(0);
    setFlashFace("front");
  }, [activeUnit]);

  const displayWords = searchResults !== null ? searchResults : unitWords;

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes cardIn { from { opacity:0; transform: translateY(6px);} to {opacity:1; transform:translateY(0);} }
        .flip-card { perspective: 1200px; }
        .flip-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d; transition: transform 0.45s cubic-bezier(.4,.2,.2,1);
        }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-face {
          position: absolute; inset: 0; backface-visibility: hidden;
          display:flex; flex-direction:column;
        }
        .flip-back { transform: rotateY(180deg); }
        .drawer-tab:focus-visible, .action-btn:focus-visible, .opt-btn:focus-visible {
          outline: 2px solid #A98B4D; outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .flip-inner { transition: none; }
        }
      `}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <div style={styles.eyebrow}>NIKO'S SAT TUTORING · WORD ARCHIVE</div>
            <h1 style={styles.title}>The Vocabulary Catalog</h1>
            <div style={styles.subtitle}>
              300 entries · 15 drawers of 20 · filed for quick retrieval
            </div>
          </div>
          <div style={styles.statsBox}>
            <div style={styles.statRow}>
              <span style={styles.statDot("#3F5D3A")} />
              <span>{totalKnown} mastered</span>
            </div>
            <div style={styles.statRow}>
              <span style={styles.statDot("#8B3A3A")} />
              <span>{totalReview} flagged for review</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mode switch */}
      <div style={styles.modeBar}>
        {[
          { id: "browse", label: "Browse drawers" },
          { id: "flash", label: "Flashcards" },
          { id: "quiz", label: "Pop quiz" },
        ].map((m) => (
          <button
            key={m.id}
            className="action-btn"
            onClick={() => {
              if (m.id === "flash") startFlash(activeUnit);
              else if (m.id === "quiz") startQuiz(activeUnit);
              else setMode("browse");
            }}
            style={{
              ...styles.modeBtn,
              ...(mode === m.id ? styles.modeBtnActive : {}),
            }}
          >
            {m.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.trim()) setMode("browse");
          }}
          placeholder="Search the catalog…"
          style={styles.searchInput}
        />
      </div>

      {/* Drawer tabs */}
      {mode !== "quiz" && (
        <div style={styles.drawerRow}>
          {Array.from({ length: TOTAL_UNITS }, (_, i) => i + 1).map((u) => (
            <button
              key={u}
              className="drawer-tab"
              onClick={() => {
                setActiveUnit(u);
                setSearch("");
                if (mode === "flash") startFlash(u);
              }}
              style={{
                ...styles.drawerTab,
                ...(activeUnit === u && !search ? styles.drawerTabActive : {}),
              }}
              title={`Drawer ${u}: words ${(u - 1) * 20 + 1}\u2013${u * 20}`}
            >
              {u}
            </button>
          ))}
        </div>
      )}

      {/* BROWSE MODE */}
      {mode === "browse" && (
        <main style={styles.main}>
          {searchResults !== null && (
            <div style={styles.resultsMeta}>
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{search}"
            </div>
          )}
          <div style={styles.cardGrid}>
            {displayWords.map((word, idx) => {
              const key = word.w;
              const num = catalogNumber(word.u, WORDS.filter(w=>w.u===word.u).indexOf(word));
              const isFlipped = !!flipped[key];
              const isKnown = known[key];
              const isReview = review[key];
              return (
                <div
                  key={key}
                  className="flip-card"
                  style={{ ...styles.cardOuter, animation: "cardIn 0.3s ease both" }}
                >
                  <div
                    onClick={() => toggleFlip(key)}
                    style={{ ...styles.cardClick }}
                  >
                    <div
                      className={`flip-inner ${isFlipped ? "flipped" : ""}`}
                      style={styles.flipInner}
                    >
                      <div className="flip-face" style={styles.faceFront(isKnown, isReview)}>
                        <div style={styles.catNum}>{num}</div>
                        <div style={styles.punchHole} />
                        <div style={styles.frontWord}>{word.w}</div>
                        <div style={styles.frontPos}>{word.p}</div>
                        <div style={styles.tapHint}>tap to reveal</div>
                      </div>
                      <div className="flip-face flip-back" style={styles.faceBack}>
                        <div style={styles.catNum}>{num}</div>
                        <div style={styles.backDef}>{word.d}</div>
                        <div style={styles.backExample}>"{word.e}"</div>
                      </div>
                    </div>
                  </div>
                  <div style={styles.cardActions}>
                    <button
                      className="action-btn"
                      onClick={() => markKnown(key)}
                      style={{
                        ...styles.tagBtn,
                        ...(isKnown ? styles.tagBtnKnownActive : {}),
                      }}
                    >
                      ✓ know it
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => markReview(key)}
                      style={{
                        ...styles.tagBtn,
                        ...(isReview ? styles.tagBtnReviewActive : {}),
                      }}
                    >
                      ⟲ review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* FLASHCARD MODE */}
      {mode === "flash" && unitWords.length > 0 && (
        <main style={styles.flashMain}>
          <div style={styles.flashProgress}>
            Drawer {activeUnit} · card {flashIndex + 1} of {unitWords.length}
          </div>
          <div
            className="flip-card"
            style={styles.flashCardOuter}
            onClick={() => setFlashFace(flashFace === "front" ? "back" : "front")}
          >
            <div
              className={`flip-inner ${flashFace === "back" ? "flipped" : ""}`}
              style={styles.flipInner}
            >
              <div className="flip-face" style={styles.flashFaceFront}>
                <div style={styles.catNum}>
                  {catalogNumber(activeUnit, flashIndex)}
                </div>
                <div style={styles.flashWord}>{unitWords[flashIndex].w}</div>
                <div style={styles.frontPos}>{unitWords[flashIndex].p}</div>
                <div style={styles.tapHint}>tap for definition</div>
              </div>
              <div className="flip-face flip-back" style={styles.flashFaceBack}>
                <div style={styles.catNum}>
                  {catalogNumber(activeUnit, flashIndex)}
                </div>
                <div style={styles.backDefLarge}>{unitWords[flashIndex].d}</div>
                <div style={styles.backExample}>"{unitWords[flashIndex].e}"</div>
              </div>
            </div>
          </div>
          <div style={styles.flashControls}>
            <button className="action-btn" style={styles.navBtn} onClick={() => nextFlash(-1)}>
              ← prev
            </button>
            <button
              className="action-btn"
              style={styles.tagBtn}
              onClick={() => markReview(unitWords[flashIndex].w)}
            >
              ⟲ flag
            </button>
            <button
              className="action-btn"
              style={{ ...styles.tagBtn, ...styles.tagBtnKnownActive }}
              onClick={() => {
                markKnown(unitWords[flashIndex].w);
                nextFlash(1);
              }}
            >
              ✓ know it — next
            </button>
            <button className="action-btn" style={styles.navBtn} onClick={() => nextFlash(1)}>
              next →
            </button>
          </div>
        </main>
      )}

      {/* QUIZ MODE */}
      {mode === "quiz" && (
        <main style={styles.quizMain}>
          <div style={styles.flashProgress}>
            Drawer {activeUnit} · question {Math.min(quizIndex + 1, quizPool.length)} of{" "}
            {quizPool.length} · score {quizScore.correct}/{quizScore.total}
          </div>
          {quizQ ? (
            <div style={styles.quizCard}>
              <div style={styles.quizPrompt}>What does this word mean?</div>
              <div style={styles.quizWord}>{quizQ.word.w}</div>
              <div style={styles.quizPos}>{quizQ.word.p}</div>
              <div style={styles.quizOptions}>
                {quizQ.options.map((opt) => {
                  let state = "idle";
                  if (quizAnswer) {
                    if (opt.w === quizQ.word.w) state = "correct";
                    else if (opt.w === quizAnswer.picked) state = "wrong";
                  }
                  return (
                    <button
                      key={opt.w}
                      className="opt-btn"
                      onClick={() => answerQuiz(opt)}
                      style={{
                        ...styles.optBtn,
                        ...(state === "correct" ? styles.optCorrect : {}),
                        ...(state === "wrong" ? styles.optWrong : {}),
                      }}
                    >
                      {opt.d}
                    </button>
                  );
                })}
              </div>
              {quizAnswer && (
                <div style={styles.quizFooter}>
                  <div style={styles.quizExampleNote}>
                    "{quizQ.word.e}"
                  </div>
                  <button className="action-btn" style={styles.navBtn} onClick={nextQuiz}>
                    next question →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.quizDone}>
              <div style={styles.quizDoneTitle}>Drawer {activeUnit} complete</div>
              <div style={styles.quizDoneScore}>
                {quizScore.correct} / {quizScore.total} correct
              </div>
              <div style={styles.flashControls}>
                <button className="action-btn" style={styles.navBtn} onClick={() => startQuiz(activeUnit)}>
                  retake this drawer
                </button>
                <button
                  className="action-btn"
                  style={{ ...styles.tagBtn, ...styles.tagBtnKnownActive }}
                  onClick={() => startQuiz(activeUnit < TOTAL_UNITS ? activeUnit + 1 : 1)}
                >
                  next drawer →
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      <footer style={styles.footer}>
        Drawer {activeUnit} of {TOTAL_UNITS} · words {(activeUnit - 1) * 20 + 1}–{activeUnit * 20}
      </footer>
    </div>
  );
}

/* ===================== STYLES ===================== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#EDE6D6",
    color: "#1B2A41",
    fontFamily: "'Georgia', 'Iowan Old Style', serif",
    paddingBottom: 40,
  },
  header: {
    background: "#1B2A41",
    color: "#EDE6D6",
    padding: "28px 20px 22px",
  },
  headerInner: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: 14,
  },
  eyebrow: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    letterSpacing: "0.12em",
    color: "#A98B4D",
    marginBottom: 6,
  },
  title: {
    fontSize: "clamp(28px, 5vw, 40px)",
    margin: 0,
    fontWeight: 400,
    letterSpacing: "0.01em",
  },
  subtitle: {
    fontSize: 14,
    color: "#c9c2ad",
    marginTop: 6,
    fontFamily: "'Courier New', monospace",
  },
  statsBox: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  statRow: { display: "flex", alignItems: "center", gap: 8 },
  statDot: (color) => ({
    display: "inline-block",
    width: 9,
    height: 9,
    borderRadius: "50%",
    background: color,
  }),
  modeBar: {
    maxWidth: 1000,
    margin: "18px auto 0",
    padding: "0 20px",
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  modeBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12.5,
    letterSpacing: "0.04em",
    background: "transparent",
    border: "1px solid #1B2A41",
    color: "#1B2A41",
    padding: "9px 14px",
    borderRadius: 3,
    cursor: "pointer",
  },
  modeBtnActive: {
    background: "#1B2A41",
    color: "#EDE6D6",
  },
  searchInput: {
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    border: "1px solid #1B2A41",
    borderRadius: 3,
    padding: "9px 12px",
    background: "#fffdf8",
    minWidth: 200,
    color: "#1B2A41",
  },
  drawerRow: {
    maxWidth: 1000,
    margin: "14px auto 0",
    padding: "0 20px",
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  drawerTab: {
    width: 34,
    height: 34,
    borderRadius: 3,
    border: "1px solid #A98B4D",
    background: "#fffdf8",
    color: "#1B2A41",
    fontFamily: "'Courier New', monospace",
    fontSize: 13,
    cursor: "pointer",
  },
  drawerTabActive: {
    background: "#A98B4D",
    color: "#1B2A41",
    fontWeight: "bold",
  },
  main: {
    maxWidth: 1000,
    margin: "22px auto 0",
    padding: "0 20px",
  },
  resultsMeta: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    marginBottom: 12,
    color: "#5a5240",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  },
  cardOuter: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  cardClick: {
    height: 168,
    cursor: "pointer",
  },
  flipInner: {
    width: "100%",
    height: "100%",
  },
  faceFront: (known, review) => ({
    background: "#fffdf8",
    border: `1.5px solid ${review ? "#8B3A3A" : known ? "#3F5D3A" : "#1B2A41"}`,
    borderRadius: 4,
    padding: "14px 16px",
    boxShadow: "2px 3px 0 rgba(27,42,65,0.15)",
    justifyContent: "center",
    alignItems: "flex-start",
  }),
  faceBack: {
    background: "#1B2A41",
    color: "#EDE6D6",
    border: "1.5px solid #1B2A41",
    borderRadius: 4,
    padding: "14px 16px",
    boxShadow: "2px 3px 0 rgba(27,42,65,0.15)",
    justifyContent: "center",
  },
  punchHole: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "1.5px solid #A98B4D",
    background: "#EDE6D6",
  },
  catNum: {
    fontFamily: "'Courier New', monospace",
    fontSize: 10.5,
    letterSpacing: "0.05em",
    opacity: 0.6,
    marginBottom: 8,
  },
  frontWord: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 1.15,
  },
  frontPos: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#A98B4D",
    marginTop: 4,
  },
  tapHint: {
    marginTop: "auto",
    fontFamily: "'Courier New', monospace",
    fontSize: 10,
    opacity: 0.5,
  },
  backDef: {
    fontSize: 14.5,
    lineHeight: 1.4,
  },
  backExample: {
    marginTop: 10,
    fontSize: 12.5,
    fontStyle: "italic",
    color: "#c9c2ad",
    lineHeight: 1.4,
  },
  cardActions: {
    display: "flex",
    gap: 6,
  },
  tagBtn: {
    flex: 1,
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    padding: "7px 8px",
    borderRadius: 3,
    border: "1px solid #1B2A41",
    background: "transparent",
    color: "#1B2A41",
    cursor: "pointer",
  },
  tagBtnKnownActive: {
    background: "#3F5D3A",
    borderColor: "#3F5D3A",
    color: "#EDE6D6",
  },
  tagBtnReviewActive: {
    background: "#8B3A3A",
    borderColor: "#8B3A3A",
    color: "#EDE6D6",
  },
  flashMain: {
    maxWidth: 640,
    margin: "26px auto 0",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flashProgress: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#5a5240",
    marginBottom: 14,
  },
  flashCardOuter: {
    width: "100%",
    maxWidth: 480,
    height: 300,
    cursor: "pointer",
  },
  flashFaceFront: {
    background: "#fffdf8",
    border: "2px solid #1B2A41",
    borderRadius: 6,
    padding: "24px 28px",
    boxShadow: "4px 5px 0 rgba(27,42,65,0.18)",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  flashFaceBack: {
    background: "#1B2A41",
    color: "#EDE6D6",
    border: "2px solid #1B2A41",
    borderRadius: 6,
    padding: "24px 28px",
    boxShadow: "4px 5px 0 rgba(27,42,65,0.18)",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  flashWord: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 8,
  },
  backDefLarge: {
    fontSize: 19,
    lineHeight: 1.5,
    marginTop: 8,
  },
  flashControls: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  navBtn: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12.5,
    padding: "10px 16px",
    borderRadius: 3,
    border: "1px solid #1B2A41",
    background: "transparent",
    color: "#1B2A41",
    cursor: "pointer",
  },
  quizMain: {
    maxWidth: 640,
    margin: "26px auto 0",
    padding: "0 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  quizCard: {
    width: "100%",
    background: "#fffdf8",
    border: "2px solid #1B2A41",
    borderRadius: 6,
    padding: "28px 26px",
    boxShadow: "4px 5px 0 rgba(27,42,65,0.18)",
    textAlign: "center",
  },
  quizPrompt: {
    fontFamily: "'Courier New', monospace",
    fontSize: 11.5,
    color: "#5a5240",
    letterSpacing: "0.05em",
  },
  quizWord: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 6,
  },
  quizPos: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#A98B4D",
    marginTop: 2,
    marginBottom: 18,
  },
  quizOptions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  optBtn: {
    textAlign: "left",
    fontSize: 14.5,
    padding: "12px 14px",
    borderRadius: 4,
    border: "1.5px solid #1B2A41",
    background: "transparent",
    color: "#1B2A41",
    cursor: "pointer",
    lineHeight: 1.35,
  },
  optCorrect: {
    background: "#3F5D3A",
    borderColor: "#3F5D3A",
    color: "#EDE6D6",
  },
  optWrong: {
    background: "#8B3A3A",
    borderColor: "#8B3A3A",
    color: "#EDE6D6",
  },
  quizFooter: {
    marginTop: 18,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  quizExampleNote: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#5a5240",
  },
  quizDone: {
    textAlign: "center",
    background: "#fffdf8",
    border: "2px solid #1B2A41",
    borderRadius: 6,
    padding: "30px 26px",
    width: "100%",
  },
  quizDoneTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  quizDoneScore: {
    fontFamily: "'Courier New', monospace",
    fontSize: 15,
    marginTop: 8,
    color: "#5a5240",
  },
  footer: {
    textAlign: "center",
    fontFamily: "'Courier New', monospace",
    fontSize: 11,
    color: "#8a8267",
    marginTop: 30,
  },
};
