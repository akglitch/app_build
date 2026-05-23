import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRShareCard({ basketId }) {
  const [copied, setCopied] = useState(false)

  if (!basketId) return null

  const shareUrl = `${window.location.origin}/basket/${basketId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const el = document.createElement('textarea')
      el.value = shareUrl
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Mensah Look',
          text: '👔 Check out my Mensah curated basket!',
          url: shareUrl,
        })
      } catch {}
    } else {
      handleCopy()
    }
  }

  return (
    <div className="mt-4 p-4 bg-black border border-gold/20 rounded-sm">
      <p className="font-display text-gold text-sm text-center mb-3 italic">Share Your Look</p>

      <div className="flex justify-center mb-3">
        <div className="p-2 bg-white rounded-sm">
          <QRCodeSVG
            value={shareUrl}
            size={100}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
          />
        </div>
      </div>

      <p className="font-body text-white/30 text-[10px] text-center mb-3 break-all px-2">
        {shareUrl}
      </p>

      <div className="flex gap-2">
        <button
          id="copy-basket-link"
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gold/40 text-gold text-xs font-body tracking-widest uppercase hover:bg-gold/10 transition-all duration-200"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </>
          )}
        </button>
        <button
          id="share-basket-btn"
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gold/40 text-gold text-xs font-body tracking-widest uppercase hover:bg-gold/10 transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  )
}
