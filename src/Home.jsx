import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi";
import CuteBee from "./components/CustomBee";
import emailjs from '@emailjs/browser';

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {


  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CuteBee size={32} disableFloat={true} />
          <span className="text-black">KSOS Media</span>
        </motion.div>
        <div className="hidden md:flex space-x-8">
          {[
            { name: "Home", id: "hero" },
            { name: "About Us", id: "about" },
            { name: "Services", id: "services" },
            { name: "FAQs", id: "faqs" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="relative px-4 py-2 bg-transparent text-black font-medium hover:text-yellow-500 "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                {item.name}
              </span>
              <motion.div
                className="absolute bottom-0 left-1/2 h-0.5 bg-yellow-400"
                initial={{ width: "0%", x: "-50%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -bottom-1 left-1/2 h-0.5 bg-yellow-400 opacity-40"
                initial={{ width: "0%", x: "-50%" }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          ))}
        </div>
        <motion.button
          onClick={() => scrollToSection("contact")}
          className="relative overflow-hidden bg-black text-white px-6 py-2 rounded-full group focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="relative z-10 flex items-center gap-2"
            whileHover={{ x: -4 }}
          >
            Say Hi, Don't Be Shy
            <motion.span
              className="opacity-0 group-hover:opacity-100"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            >
              👋
            </motion.span>
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-yellow-400"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 1350, y: 150 });

  // Add parallax effect to title
  const titleY = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  React.useEffect(() => {
    const handleScroll = () => {
      // const currentSection = Math.floor(window.scrollY / window.innerHeight);
      // const newY =  window.innerHeight - 300 
      if (window.scrollY < 200) {
        setPosition({ x: 1350, y: 150 });
      }
      // aboust us
      if (window.scrollY > 400) {
        setPosition({ x: 200, y: 150 });
      }
      // services
      if (window.scrollY > 1200) {
        setPosition({ x: 800, y: 150 });
      }
      if (window.scrollY > 2900) {
        setPosition({ x: 200, y: 150 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-200 pt-20 overflow-hidden"
      id="hero"
    >
      {/* Add floating shapes in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full opacity-20"
        />
      </div>

      {/* Existing bee motion div */}
      <motion.div
        className="fixed z-50 hidden lg:block"
        animate={{
          x: position.x,
          y: position.y,
          scale: [1, 1.1, 1],
          transition: {
            x: { type: "spring", stiffness: 50, damping: 10 },
            y: { type: "spring", stiffness: 50, damping: 10 },
            scale: { duration: 2, repeat: Infinity },
          },
        }}
        drag
        dragConstraints={{
          top: 0,
          left: 0,
          right: window.innerWidth - 100,
          bottom: window.innerHeight - 100,
        }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.2 },
        }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <div className="relative">
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2"
            >
              <div className="relative">
                {/* Small thinking bubbles */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute w-2 h-2 bg-white rounded-full bottom-12 left-1/2 transform -translate-x-6"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="absolute w-3 h-3 bg-white rounded-full bottom-16 left-1/2 transform -translate-x-4"
                ></motion.div>
                <div
                  className="bg-white px-10 py-3 rounded-[2rem] shadow-lg relative 
                  before:content-[''] before:absolute before:w-6 before:h-6 before:bg-white before:rounded-full before:-bottom-1 before:left-[15%]
                  after:content-[''] after:absolute after:w-7 after:h-7 after:bg-white after:rounded-full after:-bottom-2 after:left-[35%]
                  [&>*:nth-child(3)]:content-[''] [&>*:nth-child(3)]:absolute [&>*:nth-child(3)]:w-6 [&>*:nth-child(3)]:h-6 [&>*:nth-child(3)]:bg-white [&>*:nth-child(3)]:rounded-full [&>*:nth-child(3)]:-bottom-1 [&>*:nth-child(3)]:right-[15%]"
                >
                  <div className="text-xs font-medium text-gray-800 relative z-10 text-center">
                    Hi, my name is
                    <br />
                    <span className="text-sm font-bold">Khushi!</span> 🐝✨
                  </div>
                  {/* Cloud bottom */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-white rounded-full"></div>
                  {/* Additional cloud bubble */}
                  <div></div>
                </div>
              </div>
            </motion.div>
          )}
          <CuteBee size={60} className="drop-shadow-lg" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center relative z-10">
        <motion.div style={{ y: titleY, opacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold text-black mb-6"
          >
            Your{" "}
            <motion.span
              className="inline-block relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="inline-block"
                whileHover={{
                  color: "#2563EB",
                  transition: { duration: 0.2 },
                }}
              >
                Social{" "}
              </motion.span>
              <motion.span
                className="inline-block"
                whileHover={{
                  color: "#7C3AED",
                  transition: { duration: 0.2 },
                }}
              >
                Media
              </motion.span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
            <br />
            <motion.span
              className="relative inline-block cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              Emergency{" "}
              <motion.span
                className="inline-block"
                whileHover={{
                  color: "#DC2626",
                  scale: 1.2,
                  rotate: [0, -5, 5, -5, 0],
                  transition: {
                    duration: 0.5,
                    rotate: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.5,
                    },
                  },
                }}
              >
                Squad
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-red-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl"
          >
            When social media chaos strikes, we jump in like superheroes! Let's
            turn your brand's online presence from meh to magnetic. ✨
          </motion.p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
          }}
          onClick={() => scrollToSection("contact")}
          className="bg-black text-white text-xl px-8 py-4 rounded-full flex items-center gap-2 hover:bg-yellow-500 transition-all"
        >
          Let's Create Magic
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRight />
          </motion.span>
        </motion.button>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-3xl text-black cursor-pointer hover:text-yellow-600 transition-colors"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <HiChevronDown />
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  const { scrollYProgress } = useScroll();
  const textFill = useTransform(scrollYProgress, [0.15, 0.3], ["0%", "100%"]);

  const items = [
    {
      letter: "K",
      word: "Kickass",
      desc: "Marketing strategies that pack a punch",
    },
    {
      letter: "S",
      word: "Strategies",
      desc: "Data-driven approaches for success",
    },
    {
      letter: "O",
      word: "Outstanding",
      desc: "Results that exceed expectations",
    },
    {
      letter: "S",
      word: "Socials",
      desc: "Mastering the social media landscape",
    },
  ];

  return (
    <div className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-black mb-6">About Us</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16">
            Brands don't just need marketing—they need a squad that jumps in
            like superheroes when social media chaos strikes.
            <span className=" text-yellow-400">
              At KSOS Creative Media, we don't just post content
            </span>
            —we create brand experiences that stop the scroll, spark
            conversations, and drive real results. Whether you need a social
            media glow-up, content that actually engages, or Google Ads that
            bring in real ROI, we make sure your brand gets the spotlight it
            deserves. ✨
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map(({ letter, word, desc }) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 p-8 rounded-2xl text-center hover:bg-yellow-100 transition-colors"
              >
                <div className="text-5xl font-bold text-yellow-400 mb-4">
                  {letter}
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{word}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Add scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Instagram Marketing",
      icon: <FaInstagram className="text-4xl" />,
      features: [
        "Content Strategy",
        "Community Engagement",
        "Influencer Collaborations",
        "Performance Analytics",
      ],
      color: "from-pink-500 to-purple-500",
      description:
        "Turn your Instagram into a powerhouse of engagement with our expert strategies. 📸",
    },
    {
      title: "Facebook Marketing",
      icon: <FaFacebook className="text-4xl" />,
      features: [
        "Community Growth",
        "Content Strategy",
        "Performance Optimization",
      ],
      color: "from-blue-600 to-blue-400",
      description: "Build a thriving community that loves your brand. 💙",
    },
    {
      title: "LinkedIn Marketing",
      icon: <FaLinkedin className="text-4xl" />,
      features: ["Content Strategy", "Profile Management"],
      color: "from-blue-800 to-blue-600",
      description: "Establish your professional brand presence with impact. 💼",
    },
    {
      title: "YouTube Marketing",
      icon: <FaYoutube className="text-4xl" />,
      features: [
        "Content Planning",
        "Channel Management",
        "Performance Analytics",
      ],
      color: "from-red-600 to-red-500",
      description: "Create video content that captivates and converts. 🎥",
    },
    {
      title: "Creative Content",
      icon: "🎨",
      features: [
        "Web Design",
        "Motion Graphics",
        "2D & 3D Animation",
        "Content Strategy",
      ],
      color: "from-purple-600 to-pink-500",
      description:
        "Bring your brand to life with stunning visuals and animations. ✨",
    },
    {
      title: "UI/UX Design",
      icon: "💻",
      features: [
        "User Experience",
        "Interface Design",
        "Mobile Design",
        "Website Design",
      ],
      color: "from-green-500 to-emerald-400",
      description: "Create seamless digital experiences that users love. 🎯",
    },
  ];

  return (
    <div className="py-20 bg-black text-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            From social media domination to stunning design, we've got all the
            tools to make your brand shine! ✨
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-28 max-w-5xl mx-auto">
          {services.map(
            ({ title, icon, features, color, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{
                  x:
                    scrollPosition > 1400 &&
                    scrollPosition < 2750 &&
                    window.innerWidth >= 1024
                      ? index % 2 === 0
                        ? -200
                        : 200 // Move outward only on large screens
                      : 0,
                  transition: {
                    type: "tween",
                    ease: "easeInOut",
                  },
                }}
                className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    {icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold">{title}</h3>
                </div>

                <p className="text-white/90 mb-6 text-sm lg:text-base">
                  {description}
                </p>

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 bg-white/10 p-2 px-3 rounded-lg backdrop-blur-sm text-sm lg:text-base"
                    >
                      <span>📌</span> {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      q: "Can you help me grow my Instagram following?",
      a: "Absolutely! We don't believe in shady shortcuts—just smart strategies, killer content, and real engagement that gets people talking (and following!). 🚀",
    },
    {
      q: "What kind of ROI can I expect from ads?",
      a: "Think of ads like SRK in a Bollywood blockbuster—when done right, they steal the show! With our data-driven strategies, we make sure every rupee you invest brings back clicks, conversions, and customers. 💰🔥",
    },
    {
      q: "What type of content do you create?",
      a: "From snappy reels to scroll-stopping graphics, witty captions to long-form storytelling—if it fits your brand, we create it. Your content game? Stronger than a double-shot espresso! ☕🎯",
    },
    {
      q: "How can I build brand awareness on social media?",
      a: "It's all about consistency, creativity, and engagement. We help you craft a brand presence that's too good to ignore—so your audience won't just notice you, they'll remember you. ✨",
    },
    {
      q: "Why should I choose KSOS over any other agency?",
      a: "Because we don't do 'one-size-fits-all.' We treat your brand like our own, blending strategy, storytelling, and serious marketing magic to make you stand out. Plus, we make it fun. Who wouldn't want that? 😉",
    },
  ];

  return (
    <div className="py-20 bg-yellow-300" id="faqs">
      <div className="max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-5xl font-bold text-center mb-6"
        >
          Got Questions? 💬
        </motion.h2>
        <p className="text-xl text-center text-gray-600 mb-16">
          Poochne Mein Kya Jaata Hai? <br />
          (And yes, we love a good chat! ☕)
        </p>
        <div className="space-y-4">
          {faqs.map(({ q, a }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full bg-white px-6 py-4 text-left font-bold text-lg flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              >
                {q}
                <HiChevronDown
                  className={`transform transition-transform ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSent(true);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Email send error:", error);
        }
      );
  };

  useEffect(() => {
    let timer;
    if (isSent) {
      timer = setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSent]);

  return (
    <div className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold mb-6"
          >
            Let's Create Something Amazing!
          </motion.h2>
          <p className="text-xl text-gray-600 mb-12">
            Ready to take your social media presence from ordinary to extraordinary? Let's chat! ✨
          </p>
          {isSent && <p className="text-green-500 text-lg">Message sent successfully!</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
              required
            />
            <textarea
              name="message"
              placeholder="Tell us about your project"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
              required
            ></textarea>
            <button type="submit" className="bg-black text-white px-8 py-4 rounded-full hover:bg-yellow-400 transition-colors w-full">
              Let's Talk 📩
            </button>
          </form>
          <div className="flex justify-center gap-6 mt-12">
            <a href="#" className="text-3xl text-gray-400 hover:text-yellow-400">
              <FaLinkedin />
            </a>
            <a href="#" className="text-3xl text-gray-400 hover:text-yellow-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-3xl text-gray-400 hover:text-yellow-400">
              <FaFacebook />
            </a>
            <a href="#" className="text-3xl text-gray-400 hover:text-yellow-400">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  return (
    <div className="w-full">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
