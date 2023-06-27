package com.cityoforlando.restapi.helpers;

import com.cityoforlando.restapi.models.Agency;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


public class EmailHelper {

    public static Boolean SendinblueEmail(String to, Agency agency) throws IOException {

        Properties properties = new Properties();
        InputStream inputStream = EmailHelper.class.getClassLoader().getResourceAsStream("application.properties");
        properties.load(inputStream);

        String from = properties.getProperty("mail.smtp.username");
        String password = properties.getProperty("mail.smtp.password");

        Session session = Session.getDefaultInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Update Profile | City of Orlando");
            message.setText("Hello,\r\n Please follow the link below to update your profile with City of Orlando.\r\n http://localhost:4200/agency/" + agency.getId() + "/edit" + "\r\nBest,\r\nCity of Orlando");
            Transport.send(message);
            System.out.println("Email sent successfully.");
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }

        return true;
    }


}
