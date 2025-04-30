import React from 'react'
import './FooterComponent.css'

const FooterComponent = () => {
  return (
    <div className='footerComponent'>
      <div className="footer-inner">
        <div className="footer-heading">
          <h4>Questions? Contact us.</h4>
        </div>
        <div className="footer-list">
          <ul>
            <li>Investor Relations</li>
            <li>Privacy</li>
            <li>Speed Test</li>
          </ul>
          <ul>
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preferences</li>
            <li>Legal Notices</li>
          </ul>
          <ul>
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Corporate Information</li>
            <li>Only on Netflix</li>
          </ul>
          <ul>
            <li>Media Center</li>
            <li>Terms of Use</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FooterComponent
