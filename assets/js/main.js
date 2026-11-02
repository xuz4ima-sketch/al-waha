// Al-Waha Center: language menu (Arabic, English, Russian, French), WhatsApp links, click-to-play videos, mobile menu and the application form.
// Motion lives in motion.js; this file works on its own when GSAP or motion.js fail to load.
// No innerHTML anywhere: every string goes in through textContent or an attribute.
(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const LANGS = ['ar', 'en', 'ru', 'fr'];
  const LANG_NAMES = { ar: 'العربية', en: 'English', ru: 'Русский', fr: 'Français' };
  const STORE_KEY = 'alwaha-lang';
  const WA_NUMBER = '201018573856';
  const WA_BASE = 'https://wa.me/' + WA_NUMBER + '?text=';
  const VIDEO_IDS = ['plZvaP3GnaY', 'RPj7b26KRKU', 'obWFT4BEVIg'];
  const VIDEO_ID_RE = /^[\w-]{11}$/;
  const PHONE_RE = /^\+?\d{8,15}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const DICT = {
    ar: {
      'meta.title': 'مركز الواحة | القرآن الكريم واللغة العربية لغير الناطقين بها',
      'meta.desc': 'مركز الواحة لتعليم القرآن الكريم واللغة العربية والدراسات الإسلامية لغير الناطقين بها، بدروس مباشرة أينما كنت.',
      'skip': 'تخطَّ إلى المحتوى',
      'brand.name': 'مركز الواحة',
      'brand.home': 'مركز الواحة، أعلى الصفحة',
      'nav.label': 'أقسام الصفحة',
      'nav.menu': 'القائمة',
      'nav.programs': 'البرامج',
      'nav.leaders': 'الإدارة',
      'nav.voices': 'آراء الطلاب',
      'nav.enrol': 'التسجيل',
      'lang.label': 'اللغة:',
      'wa.aria': 'راسلنا على واتساب',
      'cta.short': 'سجّل الآن',
      'hero.name': 'مركز الواحة',
      'hero.title': 'القرآن والعربية لغير الناطقين بها',
      'hero.lead': 'دروس مباشرة مع معلّمي مركز الواحة، أينما كنت في العالم.',
      'hero.apply': 'قدّم طلب الدراسة',
      'hero.wa': 'اكتب لنا على واتساب',
      'programs.title': 'ثلاثة أبواب للدراسة',
      'programs.intro': 'اختر ما تبدأ به، واكتب لنا لنقترح عليك المستوى المناسب.',
      'n1': '١', 'n2': '٢', 'n3': '٣',
      'p.pick': 'اختر هذا الباب',
      'p1.title': 'القرآن الكريم وعلومه',
      'p1.desc': 'تعلّم تلاوة القرآن الكريم وحفظه مع فهم أحكام التجويد، بأسلوب مبسّط يناسب جميع المستويات.',
      'p1.cta': 'سجّل في القرآن الكريم',
      'p2.title': 'اللغة العربية',
      'p2.desc': 'ابدأ رحلتك في تعلّم اللغة العربية من الصفر حتى الإتقان، بدروس تفاعلية تناسب غير الناطقين بها.',
      'p2.cta': 'سجّل في اللغة العربية',
      'p3.title': 'الدراسات الإسلامية',
      'p3.desc': 'اكتشف أساسيات العقيدة والفقه والسيرة النبوية بأسلوب مبسّط، مع اختيار المواعيد والخطة التعليمية التي تناسبك.',
      'p3.cta': 'سجّل في الدراسات الإسلامية',
      'leaders.title': 'من يشرف على دراستك',
      'leaders.note': 'خلف الصورة ورقة من «المصحف الأزرق»: كتابة كوفية بالذهب على رقّ مصبوغ بالنيلة.',
      'l1.name': 'فضيلة الشيخ عبدالتواب الجمالي آل جودة',
      'l1.role': 'المشرف العام على المركز',
      'l2.name': 'د. محمود أحمد فكري',
      'l2.role': 'المستشار التعليمي لقطاع التعليم والدراسة بالمركز',
      'voices.title': 'أولياء الأمور والطلاب يتحدثون',
      'voices.channel': 'المزيد على قناتنا في يوتيوب',
      'voices.play': 'تشغيل الفيديو:',
      'v1.title': 'حوار مع آباء طلاب مركز الواحة',
      'v2.title': 'حوار مع أحد طلاب المركز',
      'v3.title': 'حوار مع طلاب المركز',
      'enrol.title': 'قدّم طلب الدراسة',
      'enrol.intro': 'ستّ خطوات قصيرة، ثم يفتح طلبك في واتساب المركز لنقترح عليك المستوى والموعد.',
      'enrol.alt': 'تفضّل الكلام مباشرة؟',
      'enrol.alt.link': 'اكتب لنا على واتساب',
      'f.step': 'الخطوة', 'f.of': 'من', 'f.steps': 'خطوات الطلب',
      'f.s1': 'الطالب', 'f.s2': 'البرامج', 'f.s3': 'المستوى', 'f.s4': 'الشكل', 'f.s5': 'المواعيد', 'f.s6': 'التواصل', 'f.s7': 'المراجعة',
      'f.s1.title': 'من سيدرس معنا؟',
      'f.s2.title': 'ماذا تريد أن تدرس؟',
      'f.s2.hint': 'اختر بابًا أو أكثر.',
      'f.s3.title': 'من أين تبدأ؟',
      'f.s4.title': 'كيف تحبّ أن تدرس؟',
      'f.s5.title': 'متى يناسبك الدرس؟',
      'f.s6.title': 'كيف نتواصل معك؟',
      'f.s7.title': 'راجع طلبك',
      'f.s7.hint': 'عند الإرسال يفتح واتساب برسالة جاهزة إلى رقم المركز ‎+20 101 857 3856، فاضغط «إرسال» هناك.',
      'f.name': 'اسم الطالب',
      'f.group': 'الفئة العمرية',
      'f.group.child': 'طفل', 'f.group.child.hint': 'حتى ١٢ سنة',
      'f.group.teen': 'ناشئ', 'f.group.teen.hint': 'من ١٣ إلى ١٧ سنة',
      'f.group.adult': 'بالغ', 'f.group.adult.hint': '١٨ سنة فأكثر',
      'f.age': 'العمر (اختياري)',
      'f.gender': 'الجنس', 'f.gender.male': 'ذكر', 'f.gender.female': 'أنثى',
      'f.parent': 'اسم وليّ الأمر',
      'prog.quran': 'التلاوة والتجويد', 'prog.quran.hint': 'قراءة صحيحة بأحكام التجويد',
      'prog.hifz': 'حفظ القرآن الكريم', 'prog.hifz.hint': 'حفظ ومراجعة مع المعلّم',
      'prog.arabic': 'اللغة العربية', 'prog.arabic.hint': 'من الحرف الأول حتى الإتقان',
      'prog.studies': 'الدراسات الإسلامية', 'prog.studies.hint': 'العقيدة والفقه والسيرة',
      'level.zero': 'من الصفر', 'level.zero.hint': 'لم أدرس هذا من قبل.',
      'level.basic': 'مستوى أساسي', 'level.basic.hint': 'أعرف الأساسيات وأريد أن أتقدّم.',
      'level.continuing': 'متابعة', 'level.continuing.hint': 'درست قبل ذلك وأريد أن أكمل.',
      'f.mode': 'مكان الدرس', 'mode.online': 'عن بُعد', 'mode.onsite': 'حضوريًا في المركز',
      'f.size': 'الدرس', 'size.solo': 'فردي', 'size.group': 'في مجموعة',
      'f.teacher': 'المعلّم المفضّل', 'teacher.male': 'معلّم', 'teacher.female': 'معلّمة', 'teacher.any': 'لا فرق',
      'f.days': 'الأيام',
      'day.sat': 'السبت', 'day.sun': 'الأحد', 'day.mon': 'الاثنين', 'day.tue': 'الثلاثاء', 'day.wed': 'الأربعاء', 'day.thu': 'الخميس', 'day.fri': 'الجمعة',
      'f.times': 'الوقت من اليوم (بتوقيتك)',
      'time.morning': 'صباحًا', 'time.morning.hint': 'من ٨ إلى ١٢',
      'time.afternoon': 'بعد الظهر', 'time.afternoon.hint': 'من ١٢ إلى ٥',
      'time.evening': 'مساءً', 'time.evening.hint': 'من ٥ إلى ١٠',
      'f.tz': 'منطقتك الزمنية',
      'f.tz.hint': 'اخترناها من إعدادات جهازك، ويمكنك تغييرها.',
      'f.phone': 'رقم واتساب أو الهاتف',
      'f.phone.hint': 'مع رمز الدولة، مثل ‎+20 أو ‎+7.',
      'f.email': 'البريد الإلكتروني (اختياري)',
      'f.note': 'ملاحظة للمعلّم (اختياري)',
      'f.note.hint': 'مثلًا: ما الذي درسته من قبل، أو ما تريد أن تصل إليه.',
      'f.prev': 'السابق', 'f.next': 'التالي', 'f.send': 'أرسل عبر واتساب',
      'f.edit': 'تعديل',
      'f.announce': 'الخطوة {n} من {t}: {name}',
      'f.done.title': 'طلبك جاهز في واتساب',
      'f.done.text': 'اضغط «إرسال» في واتساب، وسيردّ عليك المركز ليتّفق معك على المستوى والموعد. إن لم يُفتح واتساب، فاضغط الزر أدناه.',
      'f.done.again': 'افتح واتساب',
      'f.done.new': 'طلب لطالب آخر',
      'f.nojs': 'هذا النموذج يحتاج إلى JavaScript. يمكنك أن تكتب لنا مباشرة على واتساب: ‎+20 101 857 3856',
      'err.name': 'اكتب اسم الطالب، حرفين على الأقل.',
      'err.group': 'اختر الفئة العمرية للطالب.',
      'err.gender': 'اختر: ذكر أو أنثى.',
      'err.age': 'اكتب العمر رقمًا بين ٣ و٩٩، أو اتركه فارغًا.',
      'err.parent': 'للطفل نحتاج اسم وليّ الأمر.',
      'err.programs': 'اختر بابًا واحدًا على الأقل.',
      'err.level': 'اختر المستوى الأقرب إليك.',
      'err.mode': 'اختر: عن بُعد أو حضوريًا.',
      'err.size': 'اختر: فردي أو في مجموعة.',
      'err.teacher': 'اختر المعلّم المفضّل، أو «لا فرق».',
      'err.days': 'اختر يومًا واحدًا على الأقل.',
      'err.times': 'اختر وقتًا واحدًا على الأقل.',
      'err.phone': 'هذا الرقم غير مكتمل. اكتبه مع رمز الدولة، من ٨ إلى ١٥ رقمًا، مثل ‎+20 100 000 0000.',
      'err.email': 'هذا البريد غير مكتمل. اكتبه هكذا: name@example.com',
      'r.student': 'الطالب', 'r.parent': 'وليّ الأمر', 'r.programs': 'البرامج', 'r.level': 'المستوى', 'r.format': 'الشكل',
      'r.days': 'الأيام', 'r.times': 'الأوقات', 'r.tz': 'المنطقة الزمنية', 'r.phone': 'واتساب', 'r.email': 'البريد', 'r.note': 'ملاحظة',
      'r.age': 'العمر {n}', 'r.teacher': 'المعلّم: {v}',
      'msg.head': 'السلام عليكم، أودّ تقديم طلب دراسة في مركز الواحة.',
      'msg.title': 'طلب دراسة',
      'list.sep': '، ',
      'footer.title': 'اكتب لنا، ونساعدك في اختيار البرنامج المناسب لمستواك.',
      'footer.number': 'رقم واتساب',
      'footer.platform': 'منصة الواحة التعليمية',
      'footer.platform.note': 'دروس مباشرة وتسجيلات تفاعلية، من أي مكان في العالم.',
      'footer.branch': 'الفرع الجديد للأكاديمية العلمية للنشء الصغير والأجيال القادمة.',
      'footer.social': 'تابعنا',
      'footer.copy': '© ٢٠٢٦ مركز الواحة',
      'credits.label': 'مصادر الصور',
      'credit.spring': 'عين كليوباترا في سيوة:',
      'credit.quran': 'ورقة من المصحف الأزرق:',
      'credit.pd': 'ملكية عامة',
      's.facebook': 'فيسبوك', 's.instagram': 'إنستغرام', 's.youtube': 'يوتيوب', 's.tiktok': 'تيك توك',
      'wa.general': 'السلام عليكم، أودّ معرفة المزيد عن الدراسة في مركز الواحة.',
      'wa.p1': 'السلام عليكم، أودّ التسجيل في برنامج القرآن الكريم وعلومه.',
      'wa.p2': 'السلام عليكم، أودّ التسجيل في برنامج اللغة العربية.',
      'wa.p3': 'السلام عليكم، أودّ التسجيل في برنامج الدراسات الإسلامية.'
    },
    en: {
      'meta.title': 'Al-Waha Center | Quran and Arabic for non-native speakers',
      'meta.desc': 'Al-Waha Center teaches the Holy Quran, Arabic and Islamic studies to non-native speakers, in live lessons wherever you are.',
      'skip': 'Skip to content',
      'brand.name': 'Al-Waha Center',
      'brand.home': 'Al-Waha Center, back to top',
      'nav.label': 'Page sections',
      'nav.menu': 'Menu',
      'nav.programs': 'Programmes',
      'nav.leaders': 'Leadership',
      'nav.voices': 'Student voices',
      'nav.enrol': 'Apply',
      'lang.label': 'Language:',
      'wa.aria': 'Message us on WhatsApp',
      'cta.short': 'Apply now',
      'hero.name': 'Al-Waha Center',
      'hero.title': 'The Quran and Arabic for non‑native speakers',
      'hero.lead': 'Live lessons with Al-Waha’s teachers, wherever you are in the world.',
      'hero.apply': 'Apply to study',
      'hero.wa': 'Message us on WhatsApp',
      'programs.title': 'Three doors to study',
      'programs.intro': 'Choose where to begin, then message us and we will suggest the right level.',
      'n1': '1', 'n2': '2', 'n3': '3',
      'p.pick': 'Choose this door',
      'p1.title': 'The Holy Quran and its sciences',
      'p1.desc': 'Learn to recite and memorise the Quran with the rules of tajweed, explained simply for every level.',
      'p1.cta': 'Enrol in Quran studies',
      'p2.title': 'Arabic language',
      'p2.desc': 'Go from your first letter to fluency, in interactive lessons made for non-native speakers.',
      'p2.cta': 'Enrol in Arabic',
      'p3.title': 'Islamic studies',
      'p3.desc': 'Learn the foundations of creed, fiqh and the life of the Prophet, at times and on a study plan that suit you.',
      'p3.cta': 'Enrol in Islamic studies',
      'leaders.title': 'Who oversees your studies',
      'leaders.note': 'Behind them, a leaf of the Blue Qur’an: Kufic script in gold on vellum dyed with indigo.',
      'l1.name': 'Sheikh Abdel-Tawab El-Gamaly Al Gouda',
      'l1.role': 'General supervisor of the centre',
      'l2.name': 'Dr. Mahmoud Ahmed Fekry',
      'l2.role': 'Academic adviser for teaching and study at the centre',
      'voices.title': 'Parents and students, in their own words',
      'voices.channel': 'More on our YouTube channel',
      'voices.play': 'Play video:',
      'v1.title': 'Talking with fathers of Al-Waha students',
      'v2.title': 'Talking with one of our students',
      'v3.title': 'Talking with our students',
      'enrol.title': 'Apply to study',
      'enrol.intro': 'Six short steps, then your application opens in the centre’s WhatsApp so we can suggest a level and a time.',
      'enrol.alt': 'Rather talk first?',
      'enrol.alt.link': 'Message us on WhatsApp',
      'f.step': 'Step', 'f.of': 'of', 'f.steps': 'Application steps',
      'f.s1': 'Student', 'f.s2': 'Programmes', 'f.s3': 'Level', 'f.s4': 'Format', 'f.s5': 'Times', 'f.s6': 'Contact', 'f.s7': 'Review',
      'f.s1.title': 'Who will study with us?',
      'f.s2.title': 'What would you like to study?',
      'f.s2.hint': 'Choose one door or more.',
      'f.s3.title': 'Where are you starting from?',
      'f.s4.title': 'How would you like to study?',
      'f.s5.title': 'When suits you?',
      'f.s6.title': 'How do we reach you?',
      'f.s7.title': 'Check your application',
      'f.s7.hint': 'Sending opens WhatsApp with the message ready for the centre’s number, +20 101 857 3856. Press send there.',
      'f.name': 'Student’s name',
      'f.group': 'Age group',
      'f.group.child': 'Child', 'f.group.child.hint': 'Up to 12',
      'f.group.teen': 'Teenager', 'f.group.teen.hint': '13 to 17',
      'f.group.adult': 'Adult', 'f.group.adult.hint': '18 and over',
      'f.age': 'Age (optional)',
      'f.gender': 'Gender', 'f.gender.male': 'Male', 'f.gender.female': 'Female',
      'f.parent': 'Parent’s or guardian’s name',
      'prog.quran': 'Recitation and tajweed', 'prog.quran.hint': 'Reading correctly, by the rules of tajweed',
      'prog.hifz': 'Quran memorisation', 'prog.hifz.hint': 'Memorising and revising with a teacher',
      'prog.arabic': 'Arabic language', 'prog.arabic.hint': 'From the first letter to fluency',
      'prog.studies': 'Islamic studies', 'prog.studies.hint': 'Creed, fiqh and the life of the Prophet',
      'level.zero': 'From zero', 'level.zero.hint': 'I have not studied this before.',
      'level.basic': 'The basics', 'level.basic.hint': 'I know the basics and want to move on.',
      'level.continuing': 'Continuing', 'level.continuing.hint': 'I studied before and want to carry on.',
      'f.mode': 'Where', 'mode.online': 'Online', 'mode.onsite': 'In person at the centre',
      'f.size': 'Lessons', 'size.solo': 'One to one', 'size.group': 'In a group',
      'f.teacher': 'Preferred teacher', 'teacher.male': 'A male teacher', 'teacher.female': 'A female teacher', 'teacher.any': 'Either',
      'f.days': 'Days',
      'day.sat': 'Saturday', 'day.sun': 'Sunday', 'day.mon': 'Monday', 'day.tue': 'Tuesday', 'day.wed': 'Wednesday', 'day.thu': 'Thursday', 'day.fri': 'Friday',
      'f.times': 'Time of day (your time)',
      'time.morning': 'Morning', 'time.morning.hint': '8 to 12',
      'time.afternoon': 'Afternoon', 'time.afternoon.hint': '12 to 5',
      'time.evening': 'Evening', 'time.evening.hint': '5 to 10',
      'f.tz': 'Your time zone',
      'f.tz.hint': 'Taken from your device; change it if it is wrong.',
      'f.phone': 'WhatsApp or phone number',
      'f.phone.hint': 'With the country code, such as +44 or +7.',
      'f.email': 'Email (optional)',
      'f.note': 'A note for the teacher (optional)',
      'f.note.hint': 'For example, what you have studied before, or what you want to reach.',
      'f.prev': 'Back', 'f.next': 'Next', 'f.send': 'Send on WhatsApp',
      'f.edit': 'Edit',
      'f.announce': 'Step {n} of {t}: {name}',
      'f.done.title': 'Your application is ready in WhatsApp',
      'f.done.text': 'Press send in WhatsApp and the centre will reply to agree a level and a time with you. If WhatsApp did not open, use the button below.',
      'f.done.again': 'Open WhatsApp',
      'f.done.new': 'Apply for another student',
      'f.nojs': 'This form needs JavaScript. You can message us directly on WhatsApp: +20 101 857 3856',
      'err.name': 'Write the student’s name, at least two letters.',
      'err.group': 'Choose the student’s age group.',
      'err.gender': 'Choose male or female.',
      'err.age': 'Write the age as a number from 3 to 99, or leave it empty.',
      'err.parent': 'For a child we need a parent’s or guardian’s name.',
      'err.programs': 'Choose at least one door.',
      'err.level': 'Choose the level closest to yours.',
      'err.mode': 'Choose online or in person.',
      'err.size': 'Choose one to one or a group.',
      'err.teacher': 'Choose a preferred teacher, or “Either”.',
      'err.days': 'Choose at least one day.',
      'err.times': 'Choose at least one time of day.',
      'err.phone': 'That number looks incomplete. Write it with the country code, 8 to 15 digits, such as +44 7700 900000.',
      'err.email': 'That address looks incomplete. Write it as name@example.com.',
      'r.student': 'Student', 'r.parent': 'Parent', 'r.programs': 'Programmes', 'r.level': 'Level', 'r.format': 'Format',
      'r.days': 'Days', 'r.times': 'Times', 'r.tz': 'Time zone', 'r.phone': 'WhatsApp', 'r.email': 'Email', 'r.note': 'Note',
      'r.age': 'age {n}', 'r.teacher': 'teacher: {v}',
      'msg.head': 'Assalamu alaikum, I would like to apply to study at Al-Waha Center.',
      'msg.title': 'Application',
      'list.sep': ', ',
      'footer.title': 'Write to us, and we will help you choose the programme that fits your level.',
      'footer.number': 'WhatsApp number',
      'footer.platform': 'Al-Waha learning platform',
      'footer.platform.note': 'Live lessons and interactive recordings, from anywhere in the world.',
      'footer.branch': 'The new branch of the Scientific Academy for Young Learners and Future Generations.',
      'footer.social': 'Follow us',
      'footer.copy': '© 2026 Al-Waha Center',
      'credits.label': 'Photo credits',
      'credit.spring': 'Cleopatra’s Spring, Siwa:',
      'credit.quran': 'A leaf of the Blue Qur’an:',
      'credit.pd': 'public domain',
      's.facebook': 'Facebook', 's.instagram': 'Instagram', 's.youtube': 'YouTube', 's.tiktok': 'TikTok',
      'wa.general': 'Assalamu alaikum, I would like to know more about studying at Al-Waha Center.',
      'wa.p1': 'Assalamu alaikum, I would like to enrol in the Holy Quran and its sciences programme.',
      'wa.p2': 'Assalamu alaikum, I would like to enrol in the Arabic language programme.',
      'wa.p3': 'Assalamu alaikum, I would like to enrol in the Islamic studies programme.'
    },
    ru: {
      'meta.title': 'Центр «Аль-⁠Ваха» | Коран и арабский язык для иностранцев',
      'meta.desc': 'Центр «Аль-⁠Ваха» обучает Корану, арабскому языку и исламским наукам тех, для кого арабский не родной, — на живых уроках, где бы вы ни были.',
      'skip': 'Перейти к содержанию',
      'brand.name': 'Центр «Аль-⁠Ваха»',
      'brand.home': 'Центр «Аль-⁠Ваха», в начало страницы',
      'nav.label': 'Разделы страницы',
      'nav.menu': 'Меню',
      'nav.programs': 'Программы',
      'nav.leaders': 'Руководство',
      'nav.voices': 'Отзывы',
      'nav.enrol': 'Запись',
      'lang.label': 'Язык:',
      'wa.aria': 'Написать нам в WhatsApp',
      'cta.short': 'Записаться',
      'hero.name': 'Центр «Аль-⁠Ваха»',
      'hero.title': 'Коран и арабский язык для иностранцев',
      'hero.lead': 'Живые уроки с преподавателями центра, где бы вы ни находились.',
      'hero.apply': 'Подать заявку на обучение',
      'hero.wa': 'Написать нам в WhatsApp',
      'programs.title': 'Три двери к знаниям',
      'programs.intro': 'Выберите, с чего начать, и напишите нам — мы подберём подходящий уровень.',
      'n1': '1', 'n2': '2', 'n3': '3',
      'p.pick': 'Выбрать эту дверь',
      'p1.title': 'Коран и коранические науки',
      'p1.desc': 'Научитесь читать и заучивать Коран по правилам таджвида — простым языком, для любого уровня.',
      'p1.cta': 'Записаться на изучение Корана',
      'p2.title': 'Арабский язык',
      'p2.desc': 'Пройдите путь от первой буквы до свободного владения на интерактивных уроках для тех, кому арабский не родной.',
      'p2.cta': 'Записаться на арабский язык',
      'p3.title': 'Исламские науки',
      'p3.desc': 'Основы вероучения, фикха и жизнеописания Пророка простым языком — в удобное время и по удобному учебному плану.',
      'p3.cta': 'Записаться на исламские науки',
      'leaders.title': 'Кто руководит вашим обучением',
      'leaders.note': 'За ними — лист «Синего Корана»: куфическое письмо золотом на пергаменте, окрашенном индиго.',
      'l1.name': 'Шейх Абдель-Таваб аль-Гамали Аль Гуда',
      'l1.role': 'Генеральный руководитель центра',
      'l2.name': 'Д-р Махмуд Ахмед Фекри',
      'l2.role': 'Научный консультант центра по преподаванию и учёбе',
      'voices.title': 'Говорят родители и ученики',
      'voices.channel': 'Больше видео на нашем YouTube-канале',
      'voices.play': 'Смотреть видео:',
      'v1.title': 'Беседа с отцами учеников центра',
      'v2.title': 'Беседа с одним из наших учеников',
      'v3.title': 'Беседа с нашими учениками',
      'enrol.title': 'Подать заявку на обучение',
      'enrol.intro': 'Шесть коротких шагов — и заявка откроется в WhatsApp центра, чтобы мы подобрали вам уровень и время.',
      'enrol.alt': 'Хотите сначала поговорить?',
      'enrol.alt.link': 'Напишите нам в WhatsApp',
      'f.step': 'Шаг', 'f.of': 'из', 'f.steps': 'Шаги заявки',
      'f.s1': 'Ученик', 'f.s2': 'Программы', 'f.s3': 'Уровень', 'f.s4': 'Формат', 'f.s5': 'Время', 'f.s6': 'Контакты', 'f.s7': 'Проверка',
      'f.s1.title': 'Кто будет у нас учиться?',
      'f.s2.title': 'Что вы хотите изучать?',
      'f.s2.hint': 'Выберите одну дверь или несколько.',
      'f.s3.title': 'С чего вы начинаете?',
      'f.s4.title': 'Как вам удобнее учиться?',
      'f.s5.title': 'Когда вам удобно?',
      'f.s6.title': 'Как с вами связаться?',
      'f.s7.title': 'Проверьте заявку',
      'f.s7.hint': 'После отправки откроется WhatsApp с готовым сообщением на номер центра +20 101 857 3856. Нажмите там «Отправить».',
      'f.name': 'Имя ученика',
      'f.group': 'Возрастная группа',
      'f.group.child': 'Ребёнок', 'f.group.child.hint': 'До 12 лет',
      'f.group.teen': 'Подросток', 'f.group.teen.hint': 'От 13 до 17 лет',
      'f.group.adult': 'Взрослый', 'f.group.adult.hint': '18 лет и старше',
      'f.age': 'Возраст (необязательно)',
      'f.gender': 'Пол', 'f.gender.male': 'Мужской', 'f.gender.female': 'Женский',
      'f.parent': 'Имя родителя или опекуна',
      'prog.quran': 'Чтение и таджвид', 'prog.quran.hint': 'Правильное чтение по правилам таджвида',
      'prog.hifz': 'Заучивание Корана', 'prog.hifz.hint': 'Заучивание и повторение с преподавателем',
      'prog.arabic': 'Арабский язык', 'prog.arabic.hint': 'От первой буквы до свободного владения',
      'prog.studies': 'Исламские науки', 'prog.studies.hint': 'Вероучение, фикх и жизнеописание Пророка',
      'level.zero': 'С нуля', 'level.zero.hint': 'Раньше этого не изучал(а).',
      'level.basic': 'Базовый уровень', 'level.basic.hint': 'Знаю основы и хочу двигаться дальше.',
      'level.continuing': 'Продолжение', 'level.continuing.hint': 'Уже учился(-ась) и хочу продолжить.',
      'f.mode': 'Где', 'mode.online': 'Онлайн', 'mode.onsite': 'Очно в центре',
      'f.size': 'Занятия', 'size.solo': 'Индивидуально', 'size.group': 'В группе',
      'f.teacher': 'Преподаватель', 'teacher.male': 'Мужчина', 'teacher.female': 'Женщина', 'teacher.any': 'Неважно',
      'f.days': 'Дни',
      'day.sat': 'Суббота', 'day.sun': 'Воскресенье', 'day.mon': 'Понедельник', 'day.tue': 'Вторник', 'day.wed': 'Среда', 'day.thu': 'Четверг', 'day.fri': 'Пятница',
      'f.times': 'Время суток (по вашему времени)',
      'time.morning': 'Утро', 'time.morning.hint': '8–12',
      'time.afternoon': 'День', 'time.afternoon.hint': '12–17',
      'time.evening': 'Вечер', 'time.evening.hint': '17–22',
      'f.tz': 'Ваш часовой пояс',
      'f.tz.hint': 'Определён по настройкам устройства; при необходимости измените.',
      'f.phone': 'Номер WhatsApp или телефона',
      'f.phone.hint': 'С кодом страны, например +7 или +20.',
      'f.email': 'Эл. почта (необязательно)',
      'f.note': 'Комментарий для преподавателя (необязательно)',
      'f.note.hint': 'Например, что вы уже изучали или к чему хотите прийти.',
      'f.prev': 'Назад', 'f.next': 'Далее', 'f.send': 'Отправить в WhatsApp',
      'f.edit': 'Изменить',
      'f.announce': 'Шаг {n} из {t}: {name}',
      'f.done.title': 'Заявка готова в WhatsApp',
      'f.done.text': 'Нажмите «Отправить» в WhatsApp, и центр ответит вам, чтобы согласовать уровень и время. Если WhatsApp не открылся, нажмите кнопку ниже.',
      'f.done.again': 'Открыть WhatsApp',
      'f.done.new': 'Заявка для другого ученика',
      'f.nojs': 'Для этой формы нужен JavaScript. Вы можете написать нам напрямую в WhatsApp: +20 101 857 3856',
      'err.name': 'Напишите имя ученика — не меньше двух букв.',
      'err.group': 'Выберите возрастную группу ученика.',
      'err.gender': 'Выберите пол.',
      'err.age': 'Укажите возраст числом от 3 до 99 или оставьте поле пустым.',
      'err.parent': 'Для ребёнка нужно имя родителя или опекуна.',
      'err.programs': 'Выберите хотя бы одну дверь.',
      'err.level': 'Выберите уровень, который ближе всего к вашему.',
      'err.mode': 'Выберите: онлайн или очно.',
      'err.size': 'Выберите: индивидуально или в группе.',
      'err.teacher': 'Выберите преподавателя или «Неважно».',
      'err.days': 'Выберите хотя бы один день.',
      'err.times': 'Выберите хотя бы одно время суток.',
      'err.phone': 'Номер выглядит неполным. Укажите его с кодом страны, от 8 до 15 цифр, например +7 900 000-00-00.',
      'err.email': 'Адрес выглядит неполным. Напишите его так: name@example.com',
      'r.student': 'Ученик', 'r.parent': 'Родитель', 'r.programs': 'Программы', 'r.level': 'Уровень', 'r.format': 'Формат',
      'r.days': 'Дни', 'r.times': 'Время', 'r.tz': 'Часовой пояс', 'r.phone': 'WhatsApp', 'r.email': 'Почта', 'r.note': 'Комментарий',
      'r.age': 'возраст {n}', 'r.teacher': 'преподаватель: {v}',
      'msg.head': 'Ассаляму алейкум! Хочу подать заявку на обучение в центре «Аль-Ваха».',
      'msg.title': 'Заявка',
      'list.sep': ', ',
      'footer.title': 'Напишите нам — поможем выбрать программу под ваш уровень.',
      'footer.number': 'Номер WhatsApp',
      'footer.platform': 'Учебная платформа «Аль-⁠Ваха»',
      'footer.platform.note': 'Живые уроки и интерактивные записи — из любой точки мира.',
      'footer.branch': 'Новый филиал Научной академии для юных учеников и будущих поколений.',
      'footer.social': 'Мы в соцсетях',
      'footer.copy': '© 2026 Центр «Аль-⁠Ваха»',
      'credits.label': 'Источники фотографий',
      'credit.spring': 'Источник Клеопатры, Сива:',
      'credit.quran': 'Лист «Синего Корана»:',
      'credit.pd': 'общественное достояние',
      's.facebook': 'Facebook', 's.instagram': 'Instagram', 's.youtube': 'YouTube', 's.tiktok': 'TikTok',
      'wa.general': 'Ассаляму алейкум! Хочу узнать подробнее об обучении в центре «Аль-Ваха».',
      'wa.p1': 'Ассаляму алейкум! Хочу записаться на программу «Коран и коранические науки».',
      'wa.p2': 'Ассаляму алейкум! Хочу записаться на программу «Арабский язык».',
      'wa.p3': 'Ассаляму алейкум! Хочу записаться на программу «Исламские науки».'
    },
    fr: {
      'meta.title': 'Centre Al-⁠Waha | Le Coran et l’arabe pour les non-⁠arabophones',
      'meta.desc': 'Le Centre Al-⁠Waha enseigne le Saint Coran, la langue arabe et les sciences islamiques aux non-⁠arabophones, en cours en direct où que vous soyez.',
      'skip': 'Aller au contenu',
      'brand.name': 'Centre Al-⁠Waha',
      'brand.home': 'Centre Al-⁠Waha, haut de page',
      'nav.label': 'Sections de la page',
      'nav.menu': 'Menu',
      'nav.programs': 'Programmes',
      'nav.leaders': 'Direction',
      'nav.voices': 'Témoignages',
      'nav.enrol': 'Inscription',
      'lang.label': 'Langue :',
      'wa.aria': 'Écrivez-nous sur WhatsApp',
      'cta.short': 'S’inscrire',
      'hero.name': 'Centre Al-⁠Waha',
      'hero.title': 'Le Coran et l’arabe pour les non-⁠arabophones',
      'hero.lead': 'Des cours en direct avec les enseignants d’Al-⁠Waha, où que vous soyez dans le monde.',
      'hero.apply': 'Demander une inscription',
      'hero.wa': 'Écrivez-nous sur WhatsApp',
      'programs.title': 'Trois portes vers le savoir',
      'programs.intro': 'Choisissez par où commencer, puis écrivez-nous : nous vous proposerons le niveau qui vous convient.',
      'n1': '1', 'n2': '2', 'n3': '3',
      'p.pick': 'Choisir cette porte',
      'p1.title': 'Le Saint Coran et ses sciences',
      'p1.desc': 'Apprenez à réciter et à mémoriser le Coran selon les règles du tajwid, expliquées simplement, quel que soit votre niveau.',
      'p1.cta': 'S’inscrire au Coran',
      'p2.title': 'Langue arabe',
      'p2.desc': 'De la première lettre à l’aisance, en cours interactifs conçus pour les non-⁠arabophones.',
      'p2.cta': 'S’inscrire en arabe',
      'p3.title': 'Sciences islamiques',
      'p3.desc': 'Découvrez les bases de la croyance, du fiqh et de la vie du Prophète, avec des horaires et un programme d’études adaptés à vous.',
      'p3.cta': 'S’inscrire en sciences islamiques',
      'leaders.title': 'Qui encadre vos études',
      'leaders.note': 'Derrière eux, un feuillet du Coran bleu : une écriture coufique à l’or sur un vélin teint à l’indigo.',
      'l1.name': 'Cheikh Abdel-Tawab El-Gamaly Al Gouda',
      'l1.role': 'Superviseur général du centre',
      'l2.name': 'Dr Mahmoud Ahmed Fekry',
      'l2.role': 'Conseiller pédagogique pour l’enseignement et les études au centre',
      'voices.title': 'Parents et élèves racontent',
      'voices.channel': 'Plus de vidéos sur notre chaîne YouTube',
      'voices.play': 'Lire la vidéo :',
      'v1.title': 'Entretien avec des pères d’élèves d’Al-⁠Waha',
      'v2.title': 'Entretien avec l’un de nos élèves',
      'v3.title': 'Entretien avec nos élèves',
      'enrol.title': 'Demander une inscription',
      'enrol.intro': 'Six étapes courtes, puis votre demande s’ouvre dans le WhatsApp du centre pour que nous vous proposions un niveau et un horaire.',
      'enrol.alt': 'Vous préférez d’abord en parler ?',
      'enrol.alt.link': 'Écrivez-nous sur WhatsApp',
      'f.step': 'Étape', 'f.of': 'sur', 'f.steps': 'Étapes de la demande',
      'f.s1': 'Élève', 'f.s2': 'Programmes', 'f.s3': 'Niveau', 'f.s4': 'Format', 'f.s5': 'Horaires', 'f.s6': 'Contact', 'f.s7': 'Vérification',
      'f.s1.title': 'Qui va étudier avec nous ?',
      'f.s2.title': 'Que souhaitez-vous étudier ?',
      'f.s2.hint': 'Choisissez une porte ou plusieurs.',
      'f.s3.title': 'Par où commencez-vous ?',
      'f.s4.title': 'Comment souhaitez-vous étudier ?',
      'f.s5.title': 'Quand êtes-vous disponible ?',
      'f.s6.title': 'Comment vous joindre ?',
      'f.s7.title': 'Vérifiez votre demande',
      'f.s7.hint': 'L’envoi ouvre WhatsApp avec le message prêt pour le numéro du centre, +20 101 857 3856. Appuyez sur « Envoyer » dans WhatsApp.',
      'f.name': 'Nom de l’élève',
      'f.group': 'Tranche d’âge',
      'f.group.child': 'Enfant', 'f.group.child.hint': 'Jusqu’à 12 ans',
      'f.group.teen': 'Adolescent', 'f.group.teen.hint': 'De 13 à 17 ans',
      'f.group.adult': 'Adulte', 'f.group.adult.hint': '18 ans et plus',
      'f.age': 'Âge (facultatif)',
      'f.gender': 'Sexe', 'f.gender.male': 'Masculin', 'f.gender.female': 'Féminin',
      'f.parent': 'Nom du parent ou du tuteur',
      'prog.quran': 'Récitation et tajwid', 'prog.quran.hint': 'Lire correctement selon les règles du tajwid',
      'prog.hifz': 'Mémorisation du Coran', 'prog.hifz.hint': 'Mémoriser et réviser avec un enseignant',
      'prog.arabic': 'Langue arabe', 'prog.arabic.hint': 'De la première lettre à l’aisance',
      'prog.studies': 'Sciences islamiques', 'prog.studies.hint': 'Croyance, fiqh et vie du Prophète',
      'level.zero': 'Grand débutant', 'level.zero.hint': 'Je n’ai jamais étudié cela.',
      'level.basic': 'Les bases', 'level.basic.hint': 'Je connais les bases et je veux progresser.',
      'level.continuing': 'Reprise', 'level.continuing.hint': 'J’ai déjà étudié et je veux continuer.',
      'f.mode': 'Lieu', 'mode.online': 'En ligne', 'mode.onsite': 'En présentiel au centre',
      'f.size': 'Cours', 'size.solo': 'Individuel', 'size.group': 'En groupe',
      'f.teacher': 'Enseignant souhaité', 'teacher.male': 'Un enseignant', 'teacher.female': 'Une enseignante', 'teacher.any': 'Peu importe',
      'f.days': 'Jours',
      'day.sat': 'Samedi', 'day.sun': 'Dimanche', 'day.mon': 'Lundi', 'day.tue': 'Mardi', 'day.wed': 'Mercredi', 'day.thu': 'Jeudi', 'day.fri': 'Vendredi',
      'f.times': 'Moment de la journée (votre heure)',
      'time.morning': 'Matin', 'time.morning.hint': '8 h – 12 h',
      'time.afternoon': 'Après-midi', 'time.afternoon.hint': '12 h – 17 h',
      'time.evening': 'Soir', 'time.evening.hint': '17 h – 22 h',
      'f.tz': 'Votre fuseau horaire',
      'f.tz.hint': 'Détecté sur votre appareil ; modifiez-le s’il est inexact.',
      'f.phone': 'Numéro WhatsApp ou de téléphone',
      'f.phone.hint': 'Avec l’indicatif du pays, par exemple +33 ou +20.',
      'f.email': 'E-mail (facultatif)',
      'f.note': 'Un mot pour l’enseignant (facultatif)',
      'f.note.hint': 'Par exemple, ce que vous avez déjà étudié ou l’objectif que vous visez.',
      'f.prev': 'Retour', 'f.next': 'Suivant', 'f.send': 'Envoyer sur WhatsApp',
      'f.edit': 'Modifier',
      'f.announce': 'Étape {n} sur {t} : {name}',
      'f.done.title': 'Votre demande est prête dans WhatsApp',
      'f.done.text': 'Appuyez sur « Envoyer » dans WhatsApp, et le centre vous répondra pour convenir d’un niveau et d’un horaire. Si WhatsApp ne s’est pas ouvert, utilisez le bouton ci-dessous.',
      'f.done.again': 'Ouvrir WhatsApp',
      'f.done.new': 'Demande pour un autre élève',
      'f.nojs': 'Ce formulaire nécessite JavaScript. Vous pouvez nous écrire directement sur WhatsApp : +20 101 857 3856',
      'err.name': 'Écrivez le nom de l’élève, au moins deux lettres.',
      'err.group': 'Choisissez la tranche d’âge de l’élève.',
      'err.gender': 'Choisissez masculin ou féminin.',
      'err.age': 'Écrivez l’âge en chiffres, de 3 à 99, ou laissez le champ vide.',
      'err.parent': 'Pour un enfant, il nous faut le nom d’un parent ou d’un tuteur.',
      'err.programs': 'Choisissez au moins une porte.',
      'err.level': 'Choisissez le niveau le plus proche du vôtre.',
      'err.mode': 'Choisissez en ligne ou en présentiel.',
      'err.size': 'Choisissez individuel ou en groupe.',
      'err.teacher': 'Choisissez un enseignant, ou « Peu importe ».',
      'err.days': 'Choisissez au moins un jour.',
      'err.times': 'Choisissez au moins un moment de la journée.',
      'err.phone': 'Ce numéro semble incomplet. Écrivez-le avec l’indicatif du pays, de 8 à 15 chiffres, par exemple +33 6 12 34 56 78.',
      'err.email': 'Cette adresse semble incomplète. Écrivez-la ainsi : name@example.com',
      'r.student': 'Élève', 'r.parent': 'Parent', 'r.programs': 'Programmes', 'r.level': 'Niveau', 'r.format': 'Format',
      'r.days': 'Jours', 'r.times': 'Horaires', 'r.tz': 'Fuseau horaire', 'r.phone': 'WhatsApp', 'r.email': 'E-mail', 'r.note': 'Note',
      'r.age': '{n} ans', 'r.teacher': 'enseignant : {v}',
      'msg.head': 'Assalamou alaykoum, je souhaite faire une demande d’inscription au Centre Al-Waha.',
      'msg.title': 'Demande d’inscription',
      'list.sep': ', ',
      'footer.title': 'Écrivez-nous, et nous vous aiderons à choisir le programme adapté à votre niveau.',
      'footer.number': 'Numéro WhatsApp',
      'footer.platform': 'Plateforme d’enseignement Al-⁠Waha',
      'footer.platform.note': 'Cours en direct et enregistrements interactifs, partout dans le monde.',
      'footer.branch': 'La nouvelle branche de l’Académie scientifique pour les jeunes et les générations futures.',
      'footer.social': 'Suivez-nous',
      'footer.copy': '© 2026 Centre Al-⁠Waha',
      'credits.label': 'Crédits photo',
      'credit.spring': 'Source de Cléopâtre, Siwa :',
      'credit.quran': 'Feuillet du Coran bleu :',
      'credit.pd': 'domaine public',
      's.facebook': 'Facebook', 's.instagram': 'Instagram', 's.youtube': 'YouTube', 's.tiktok': 'TikTok',
      'wa.general': 'Assalamou alaykoum, je souhaite en savoir plus sur les études au Centre Al-Waha.',
      'wa.p1': 'Assalamou alaykoum, je souhaite m’inscrire au programme « Le Saint Coran et ses sciences ».',
      'wa.p2': 'Assalamou alaykoum, je souhaite m’inscrire au programme de langue arabe.',
      'wa.p3': 'Assalamou alaykoum, je souhaite m’inscrire au programme de sciences islamiques.'
    }
  };

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // The claude.ai artifact frame cannot embed YouTube, so its copy of the page sets this meta and the videos open as links.
  const canEmbed = !document.querySelector('meta[name="alwaha-embed"][content="off"]');
  let current = 'ar';

  const t = (key) => DICT[current][key] ?? DICT.ar[key] ?? key;
  const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ''));
  const digits = (n) => (current === 'ar' ? String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]) : String(n));
  const isLang = (value) => LANGS.includes(value);
  const motion = () => window.AlWahaMotion || null;

  function readStored() {
    try { return localStorage.getItem(STORE_KEY); } catch { return null; }
  }

  function store(lang) {
    try { localStorage.setItem(STORE_KEY, lang); } catch { /* storage blocked: the choice lasts for this visit only */ }
  }

  // ?lang= wins when present; anything outside the whitelist falls back to Arabic.
  function initialLang() {
    let param = null;
    try { param = new URLSearchParams(window.location.search).get('lang'); } catch { param = null; }
    if (param !== null) return isLang(param) ? param : 'ar';
    const saved = readStored();
    return isLang(saved) ? saved : 'ar';
  }

  function syncUrl(lang) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    } catch { /* sandboxed frames may refuse history access */ }
  }

  function apply(lang) {
    const d = DICT[lang];
    current = lang;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = d['meta.title'];
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', d['meta.desc']);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const text = d[el.dataset.i18n];
      if (typeof text === 'string' && !el.dataset.err) el.textContent = text;
    });
    document.querySelectorAll('[data-err]').forEach((el) => { el.textContent = t(el.dataset.err); });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const text = d[el.dataset.i18nAlt];
      if (typeof text === 'string') el.alt = text;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const text = d[el.dataset.i18nAria];
      if (typeof text === 'string') el.setAttribute('aria-label', text);
    });
    document.querySelectorAll('[data-wa]').forEach((el) => {
      const text = d[el.dataset.wa];
      if (typeof text === 'string') el.href = WA_BASE + encodeURIComponent(text);
    });
    document.querySelectorAll('[data-lang-current]').forEach((el) => { el.textContent = LANG_NAMES[lang]; });
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      if (btn.dataset.lang === lang) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current');
    });
    document.querySelectorAll('iframe[data-caption]').forEach((frame) => {
      const text = d[frame.dataset.caption];
      if (typeof text === 'string') frame.title = text;
    });
    document.dispatchEvent(new CustomEvent('alwaha:lang', { detail: { lang } }));
  }

  function switchTo(next) {
    apply(next);
    store(next);
    syncUrl(next);
  }

  // The globe opens a list of the four languages. The chosen one opens inside a circle from the globe (View Transitions);
  // without the API a night curtain covers the swap; with reduced motion it is instant.
  function initLanguage() {
    apply(initialLang());
    const box = document.querySelector('[data-langs]');
    const toggle = box && box.querySelector('[data-lang-toggle]');
    if (!toggle) return;
    const setOpen = (open) => {
      box.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(box.dataset.open !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && box.dataset.open === 'true') { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (box.dataset.open === 'true' && !box.contains(e.target)) setOpen(false);
    });
    box.addEventListener('focusout', (e) => {
      if (!box.contains(e.relatedTarget)) setOpen(false);
    });
    box.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.lang;
        setOpen(false);
        toggle.focus();
        if (!isLang(next) || next === current) return;
        const r = toggle.getBoundingClientRect();
        root.style.setProperty('--vt-x', Math.round(r.left + r.width / 2) + 'px');
        root.style.setProperty('--vt-y', Math.round(r.top + r.height / 2) + 'px');
        if (reduceMotion.matches) { switchTo(next); return; }
        if (typeof document.startViewTransition === 'function') {
          document.startViewTransition(() => switchTo(next));
        } else if (motion() && motion().curtain) {
          motion().curtain(() => switchTo(next));
        } else {
          switchTo(next);
        }
      });
    });
  }

  function initMenu() {
    const masthead = document.querySelector('.masthead');
    const toggle = masthead && masthead.querySelector('.nav__toggle');
    if (!toggle) return;
    const setOpen = (open) => {
      masthead.dataset.menu = open ? 'open' : 'closed';
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(masthead.dataset.menu !== 'open'));
    masthead.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && masthead.dataset.menu === 'open') { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (masthead.dataset.menu === 'open' && !masthead.contains(e.target)) setOpen(false);
    });
  }

  // Lite embed: the poster is a plain link to YouTube; with script it swaps for a youtube-nocookie player on click.
  function initVideos() {
    if (!canEmbed) return;
    document.querySelectorAll('a[data-video]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.dataset.video;
        if (!VIDEO_ID_RE.test(id) || !VIDEO_IDS.includes(id)) return;
        e.preventDefault();
        const frame = document.createElement('iframe');
        frame.className = 'clip__frame';
        frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&hl=' + current;
        frame.dataset.caption = link.dataset.caption || '';
        frame.title = DICT[current][frame.dataset.caption] || 'YouTube';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.loading = 'lazy';
        frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation allow-popups');
        link.replaceWith(frame);
        frame.focus();
      });
    });
  }

  // Buttons fill from the point the pointer entered.
  function initFills() {
    document.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('pointerenter', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--x', Math.round(e.clientX - r.left) + 'px');
        btn.style.setProperty('--y', Math.round(e.clientY - r.top) + 'px');
      });
    });
  }

  // The masthead turns into a floating night bar once the page leaves its first 60px.
  function initMasthead() {
    const masthead = document.querySelector('.masthead');
    if (!masthead) return;
    let queued = false;
    const sync = () => { queued = false; masthead.classList.toggle('is-stuck', window.scrollY > 60); };
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(sync); } }, { passive: true });
    sync();
  }

  /* ---------- The application form ---------- */

  const TOTAL = 7;
  const STEP_KEYS = ['f.s1', 'f.s2', 'f.s3', 'f.s4', 'f.s5', 'f.s6', 'f.s7'];
  const PICKS = { quran: 'quran', arabic: 'arabic', studies: 'studies' };

  function initForm() {
    const form = document.querySelector('[data-apply]');
    if (!form) return;
    const steps = Array.from(form.querySelectorAll('.apply__step'));
    const prev = form.querySelector('[data-prev]');
    const next = form.querySelector('[data-next]');
    const nextLabel = form.querySelector('[data-next-label]');
    const nav = form.querySelector('[data-nav]');
    const progress = form.querySelector('.apply__progress');
    const bar = form.querySelector('.apply__bar');
    const nowEl = form.querySelector('[data-step-now]');
    const totalEl = form.querySelector('[data-step-total]');
    const announce = form.querySelector('[data-announce]');
    const review = form.querySelector('[data-review]');
    const done = form.querySelector('[data-done]');
    const doneLink = form.querySelector('[data-done-link]');
    const tz = form.querySelector('#f-tz');
    const parentField = form.querySelector('[data-parent]');
    const parentInput = form.querySelector('#f-parent');
    const stepButtons = Array.from(form.querySelectorAll('[data-goto]'));
    let step = 1;
    let reached = 1;
    let lastUrl = WA_BASE;

    const val = (name) => (form.elements[name] && typeof form.elements[name].value === 'string' ? form.elements[name].value.trim() : '');
    const checked = (name) => Array.from(form.querySelectorAll('input[name="' + name + '"]:checked')).map((i) => i.value);
    const group = () => checked('group')[0] || '';

    // Time zones: the device's own first, then every zone the browser knows, each with its current UTC offset.
    function fillZones() {
      let here = 'Africa/Cairo';
      try { here = Intl.DateTimeFormat().resolvedOptions().timeZone || here; } catch { /* keep Cairo */ }
      let zones = [];
      try { zones = Intl.supportedValuesOf('timeZone'); } catch { zones = []; }
      if (!zones.length) zones = ['Africa/Cairo', 'Asia/Riyadh', 'Asia/Dubai', 'Europe/Istanbul', 'Europe/Moscow', 'Europe/London', 'Europe/Berlin', 'America/New_York', 'America/Chicago', 'America/Los_Angeles', 'America/Toronto', 'Asia/Karachi', 'Asia/Kolkata', 'Asia/Jakarta', 'Asia/Kuala_Lumpur', 'Australia/Sydney'];
      if (!zones.includes(here)) zones.unshift(here);
      const offset = (zone) => {
        try {
          const part = new Intl.DateTimeFormat('en', { timeZone: zone, timeZoneName: 'shortOffset' }).formatToParts(new Date()).find((p) => p.type === 'timeZoneName');
          return part ? part.value.replace('GMT', 'UTC') : '';
        } catch { return ''; }
      };
      tz.replaceChildren();
      zones.forEach((zone) => {
        const o = document.createElement('option');
        o.value = zone;
        const off = offset(zone);
        o.textContent = zone.replace(/_/g, ' ') + (off ? ' (' + (off === 'UTC' ? 'UTC+0' : off) + ')' : '');
        tz.append(o);
      });
      tz.value = here;
    }

    function msgFor(el) {
      const id = el.getAttribute('aria-describedby');
      return id ? document.getElementById(id) : null;
    }

    function setError(target, key) {
      const msg = msgFor(target);
      if (target.matches('fieldset')) target.dataset.invalid = 'true';
      target.setAttribute('aria-invalid', 'true');
      if (msg) { msg.dataset.err = key; msg.textContent = t(key); msg.classList.add('is-error'); }
    }

    function clearError(target) {
      const msg = msgFor(target);
      target.removeAttribute('aria-invalid');
      delete target.dataset.invalid;
      if (msg && msg.dataset.err) {
        delete msg.dataset.err;
        msg.classList.remove('is-error');
        msg.textContent = msg.dataset.i18n ? t(msg.dataset.i18n) : '';
      }
    }

    const choice = (name) => form.querySelector('[data-required="' + name + '"]');

    // Each rule returns the error key, or '' when the answer is fine.
    const RULES = {
      name: () => (val('name').length >= 2 ? '' : 'err.name'),
      age: () => {
        const v = val('age');
        if (!v) return '';
        const n = Number(v);
        return Number.isInteger(n) && n >= 3 && n <= 99 ? '' : 'err.age';
      },
      parent: () => (group() === 'child' && val('parent').length < 2 ? 'err.parent' : ''),
      phone: () => (PHONE_RE.test(val('phone').replace(/[\s\-().]/g, '').replace(/^00/, '+')) ? '' : 'err.phone'),
      email: () => (!val('email') || EMAIL_RE.test(val('email')) ? '' : 'err.email')
    };
    const CHOICES = { group: 'err.group', gender: 'err.gender', programs: 'err.programs', level: 'err.level', mode: 'err.mode', size: 'err.size', teacher: 'err.teacher', days: 'err.days', times: 'err.times' };
    const STEP_FIELDS = {
      1: ['name', 'group', 'age', 'gender', 'parent'],
      2: ['programs'], 3: ['level'], 4: ['mode', 'size', 'teacher'], 5: ['days', 'times'], 6: ['phone', 'email'], 7: []
    };

    function check(name, show) {
      if (CHOICES[name]) {
        const fs = choice(name);
        const ok = checked(name).length > 0;
        if (ok) clearError(fs); else if (show) setError(fs, CHOICES[name]);
        return ok ? null : fs;
      }
      const input = form.elements[name];
      const key = RULES[name] ? RULES[name]() : '';
      if (!key) clearError(input); else if (show) setError(input, key);
      return key ? input : null;
    }

    function validateStep(n) {
      let first = null;
      STEP_FIELDS[n].forEach((name) => {
        const bad = check(name, true);
        if (bad && !first) first = bad;
      });
      if (first) {
        const target = first.matches('fieldset') ? first.querySelector('input') : first;
        target.focus();
      }
      return !first;
    }

    // Text fields validate on blur once touched, then on every keystroke; choices clear their error on change.
    ['name', 'age', 'parent', 'phone', 'email'].forEach((name) => {
      const input = form.elements[name];
      input.addEventListener('blur', () => { if (input.value.trim()) { input.dataset.touched = '1'; check(name, true); } });
      input.addEventListener('input', () => { if (input.dataset.touched || input.getAttribute('aria-invalid')) check(name, true); });
    });
    Object.keys(CHOICES).forEach((name) => {
      form.querySelectorAll('input[name="' + name + '"]').forEach((i) => i.addEventListener('change', () => check(name, false)));
    });

    function syncParent() {
      const g = group();
      const show = g === 'child' || g === 'teen';
      parentField.hidden = !show;
      parentInput.required = g === 'child';
      parentInput.setAttribute('aria-required', String(g === 'child'));
      if (!show) clearError(parentInput);
    }
    form.querySelectorAll('input[name="group"]').forEach((i) => i.addEventListener('change', syncParent));

    function labelOf(name, value) {
      const map = {
        group: 'f.group.', gender: 'f.gender.', programs: 'prog.', level: 'level.', mode: 'mode.', size: 'size.', teacher: 'teacher.', days: 'day.', times: 'time.'
      };
      return t(map[name] + value);
    }
    const list = (name) => checked(name).map((v) => labelOf(name, v)).join(t('list.sep'));

    function summary() {
      const sep = t('list.sep');
      const who = [val('name'), labelOf('group', group())];
      if (val('age')) who.push(fill(t('r.age'), { n: digits(val('age')) }));
      who.push(labelOf('gender', checked('gender')[0]));
      const times = checked('times').map((v) => labelOf('times', v) + ' (' + t('time.' + v + '.hint') + ')').join(sep);
      const rows = [
        ['r.student', who.join(sep), 1],
        ...(val('parent') ? [['r.parent', val('parent'), 1]] : []),
        ['r.programs', list('programs'), 2],
        ['r.level', labelOf('level', checked('level')[0]), 3],
        ['r.format', [labelOf('mode', checked('mode')[0]), labelOf('size', checked('size')[0]), fill(t('r.teacher'), { v: labelOf('teacher', checked('teacher')[0]) })].join(sep), 4],
        ['r.days', list('days'), 5],
        ['r.times', times, 5],
        ['r.tz', tz.options[tz.selectedIndex] ? tz.options[tz.selectedIndex].textContent : val('tz'), 5],
        ['r.phone', val('phone'), 6],
        ...(val('email') ? [['r.email', val('email'), 6]] : []),
        ...(val('note') ? [['r.note', val('note'), 6]] : [])
      ];
      return rows;
    }

    function renderReview() {
      const rows = summary();
      review.replaceChildren();
      rows.forEach(([key, value, goto]) => {
        const row = document.createElement('div');
        row.className = 'review__row';
        const dt = document.createElement('dt');
        dt.textContent = t(key);
        const dd = document.createElement('dd');
        dd.textContent = value;
        if (key === 'r.phone' || key === 'r.email') dd.dir = 'ltr';
        const edit = document.createElement('button');
        edit.type = 'button';
        edit.className = 'review__edit';
        edit.textContent = t('f.edit');
        edit.setAttribute('aria-label', t('f.edit') + ': ' + t(key));
        edit.addEventListener('click', () => go(goto));
        row.append(dt, dd, edit);
        review.append(row);
      });
    }

    function message() {
      const lines = [t('msg.head'), '', '*' + t('msg.title') + '*'];
      summary().forEach(([key, value]) => lines.push(t(key) + ': ' + value));
      return lines.join('\n');
    }

    function paint() {
      const fraction = step / TOTAL;
      form.style.setProperty('--progress', String(fraction));
      bar.setAttribute('aria-valuenow', String(step));
      nowEl.textContent = digits(step);
      totalEl.textContent = digits(TOTAL);
      stepButtons.forEach((b) => {
        const n = Number(b.dataset.goto);
        b.disabled = n > reached;
        b.classList.toggle('is-done', n < step && n <= reached);
        if (n === step) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      });
      prev.disabled = step === 1;
      nextLabel.dataset.i18n = step === TOTAL ? 'f.send' : 'f.next';
      nextLabel.textContent = t(nextLabel.dataset.i18n);
      if (step === TOTAL) renderReview();
    }

    function go(n, focus = true) {
      if (n < 1 || n > TOTAL || n === step) return;
      const from = steps[step - 1];
      const to = steps[n - 1];
      const dir = n > step ? 1 : -1;
      step = n;
      reached = Math.max(reached, n);
      from.classList.remove('is-current');
      to.classList.add('is-current');
      paint();
      if (motion() && motion().stepIn) motion().stepIn(to, dir);
      announce.textContent = fill(t('f.announce'), { n: digits(step), t: digits(TOTAL), name: t(STEP_KEYS[step - 1]) });
      if (focus) {
        const legend = to.querySelector('.apply__legend');
        if (legend) legend.focus({ preventScroll: true });
        const top = form.getBoundingClientRect().top;
        if (top < 0) {
          if (motion() && motion().scrollTo) motion().scrollTo(form);
          else form.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
        }
      }
    }

    function send() {
      lastUrl = WA_BASE + encodeURIComponent(message());
      doneLink.href = lastUrl;
      window.open(lastUrl, '_blank', 'noopener,noreferrer');
      steps.forEach((s) => s.classList.remove('is-current'));
      nav.hidden = true;
      progress.hidden = true;
      done.hidden = false;
      if (motion() && motion().done) motion().done(done);
      done.focus({ preventScroll: true });
    }

    function restart() {
      form.reset();
      form.querySelectorAll('[aria-invalid]').forEach(clearError);
      form.querySelectorAll('[data-touched]').forEach((i) => delete i.dataset.touched);
      fillZones();
      syncParent();
      done.hidden = true;
      nav.hidden = false;
      progress.hidden = false;
      steps.forEach((s, i) => s.classList.toggle('is-current', i === 0));
      step = 1;
      reached = 1;
      paint();
      const legend = steps[0].querySelector('.apply__legend');
      if (legend) legend.focus();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateStep(step)) return;
      if (step < TOTAL) go(step + 1); else send();
    });
    prev.addEventListener('click', () => go(step - 1));
    stepButtons.forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.goto))));
    form.querySelector('[data-restart]').addEventListener('click', restart);

    // A door's "choose" link ticks its programme before the page travels to the form.
    document.querySelectorAll('[data-pick]').forEach((link) => {
      link.addEventListener('click', () => {
        const value = PICKS[link.dataset.pick];
        const box = value && form.querySelector('input[name="programs"][value="' + value + '"]');
        if (box) { box.checked = true; check('programs', false); }
      });
    });

    document.addEventListener('alwaha:lang', () => {
      paint();
      if (!announce.textContent) return;
      announce.textContent = '';
    });

    fillZones();
    syncParent();
    steps.forEach((s, i) => s.classList.toggle('is-current', i === 0));
    paint();
  }

  initLanguage();
  initMenu();
  initVideos();
  initFills();
  initMasthead();
  initForm();
})();
