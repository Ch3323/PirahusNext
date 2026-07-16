import React, { useState, useRef, useEffect } from 'react'
import { FaPlus, FaMinus } from "react-icons/fa";
import gsap from "gsap";

const faqs = [
  {
    question: "เว็บนี้ใครเล่นได้บ้าง ?",
    answer: "เว็บนี้เปิดให้เฉพาะนักศึกษาสาขาวิทยาการคอมพิวเตอร์ประยุกต์ มหาวิทยาลัยพระจอมเกล้าธนบุรี ที่มีรหัสปีการศึกษา 68/69 เท่านั้น"
  },
  {
    question: "แล้วเว็บนี้เล่นยังไงอะ ?",
    answer: "อย่างแรกต้องล็อกอินที่ปุ่มด้านบนขวาก่อน หลังจากนั้นก็สามารถเล่นมินิเกมส์ต่างๆเพื่อเก็บคะแนนได้เลย"
  },
  {
    question: "ล็อกอินยังไงออ ?",
    answer: "ล็อกอินด้วยเลขประจำตัวนักศึกษาได้เลย โดยครั้งแรกที่ล็อกอินจะสามารถตั้งชื่อเล่น และรหัสผ่านได้ หลังจากนั้นก็สามารถล็อกอินด้วยรหัสผ่านที่ตั้งไว้ได้เลย"
  },
  {
    question: "พี่รหัสต้องทำอะไรบ้าง ?",
    answer: "หลังจากล็อกอินให้กดที่ปุ่ม user หรือปุ่มฟันเฟืองด้านบนขวาแล้วไปที่ archive เพื่อ add คำใบ้ให้น้อง"
  },
  {
    question: "จะหาคำใบ้ได้อย่างไรรึ ?",
    answer: "คำใบ้จะได้จากการนำคะแนนที่ได้จากมินิเกมส์ไปแลกที่ชอป โดยคำใบ้ที่ซื้อมาแล้วจะสามารถดูได้ที่ archive ของน้องรหัส"
  },
  {
    question: "ชอปอยู่ไหนนน ?",
    answer: "อยู่หน้ามินิเกมส์เลยจ้าาา (กดปุ่ม To Minigame ด้านบนหรือปุ่มฟันเฟืองด้านบนขวา)"
  },
  {
    question: "คำใบ้เป็นยังไงบ้าง ?",
    answer: "คำใบ้จะมีทั้งหมด 5 ระดับ โดยระดับที่สูงขึ้นจะใช้คะแนนมากขึ้น แต่ก็จะได้คำใบ้ที่ชัดเจนมากขึ้นเช่นกัน"
  }
]

function FAQItem({ faq, isOpen, onToggle }: {
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
}) {
  const answerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = answerRef.current
    const inner = innerRef.current
    if (!el || !inner) return

    if (isOpen) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: inner.offsetHeight, opacity: 1, duration: 0.4, ease: "power3.out",
          onComplete: () => { el.style.height = "auto" }
        }
      )
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" })
    }
  }, [isOpen])

  return (
    <div
      className="faq-item"
      style={{ paddingTop: '0.5rem', contain: 'layout paint', willChange: 'contents' }}
    >
      <button onClick={onToggle} className="w-full flex justify-between items-center py-4 text-left group">
        <span className="text-white text-2xl group-hover:opacity-70 transition-opacity duration-200">
          {faq.question}
        </span>
        <span className="text-gray-400 ml-4">
          {isOpen ? <FaMinus size={12} /> : <FaPlus size={12} />}
        </span>
      </button>

      <div
        ref={answerRef}
        style={{ height: 0, overflow: "hidden", opacity: 0, contain: 'layout paint', willChange: 'height, opacity' }}
        onClick={onToggle}
      >
        <div ref={innerRef} className="text-lg leading-relaxed" style={{ paddingTop: '0.25rem' }}>
          {faq.answer}
        </div>
      </div>

      <hr className="border-gray-800" style={{ marginTop: "0.5rem" }} />
    </div>
  )
}

function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const items = containerRef.current.querySelectorAll('.faq-item')
    gsap.fromTo(items,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    )
  }, [])

  const toggle = (i: number) => setOpenIndices(prev =>
    prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
  )

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center"
      style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
    >
      <h1 className="text-white text-5xl font-bold tracking-widest mb-12">FAQ</h1>

      <div ref={containerRef} className="w-full max-w-2xl">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} isOpen={openIndices.includes(i)} onToggle={() => toggle(i)} />
        ))}
      </div>
    </div>
  )
}

export default FAQ