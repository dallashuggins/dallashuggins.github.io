import React from 'react'
import css from './Home.sass'

export default function Home ({ children }) {
  return (
    <div className={css.siteContent}>
      { children }
    </div>
  )
}
