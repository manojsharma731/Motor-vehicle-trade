import React from 'react';
import './ContactInfo.css'; // Create a separate CSS file for styling

const ContactInfo = () => {
  const contactData = [
    {
      queryType: "Sales Inquiry",
      email: "sales@motorinventory.com",
      phone: "+1 234 567 890",
      description: "Contact us for inquiries related to vehicle purchases and sales."
    },
    {
      queryType: "Customer Support",
      email: "support@motorinventory.com",
      phone: "+1 234 567 891",
      description: "Reach out for any support-related questions or issues."
    },
    {
      queryType: "Technical Assistance",
      email: "techsupport@motorinventory.com",
      phone: "+1 234 567 892",
      description: "For technical assistance with the website or app, get in touch with our tech team."
    },
    {
      queryType: "General Inquiry",
      email: "info@motorinventory.com",
      phone: "+1 234 567 893",
      description: "For any other queries or information about the company."
    }
  ];

  return (
    <div className="contact-info-container">
      <h1 className="contact-title">Motor Vehicle Trade and Inventory System</h1>
      <p className="company-description">
        We are dedicated to providing a comprehensive platform for buying and selling vehicles. 
        Our system offers detailed insights and inventory management solutions to help you 
        make informed decisions and manage your vehicle needs efficiently.
      </p>
      
      <div className="contact-card-wrapper">
        {contactData.map((contact, index) => (
          <div key={index} className="contact-card">
            <h3 className="query-type">{contact.queryType}</h3>
            <p className="contact-description">{contact.description}</p>
            <p className="contact-email">
              <strong>Email: </strong>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p className="contact-phone">
              <strong>Phone: </strong>{contact.phone}
            </p>
          </div>
        ))}
      </div>
      
      <footer className="footer">
        <p>&copy; 2024 Motor Vehicle Trade and Inventory System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactInfo;