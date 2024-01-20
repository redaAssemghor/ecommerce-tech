'use client'
import React from 'react'
import Link from 'next/link'

import { Header as HeaderType, User } from '../../../payload/payload-types'
import { useAuth } from '../../_providers/Auth'
import { Button } from '../../_components/Button'
import { CartLink } from '../../_components/CartLink'
import { CMSLink } from '../../_components/Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav
      className={[
        classes.nav,
        // fade the nav in on user load to avoid flash of content and layout shift
        // Vercel also does this in their own website header, see https://vercel.com
        user === undefined && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      <CartLink />
      {user && <Link href="/account">Account</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {user && <CartLink />}
    </nav>
  )
}
