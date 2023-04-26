import styles from "./privacyBody.module.css";

import Image1 from "../../assets/image/support/image1.png";
import { useState } from "react";

const PrivacyBody = () => {
  const [active, setActive] = useState(0);

  return (
    <div className={`container ${styles.section}`}>
      <h2>Privacy Policy:</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <h3>1. An overview of data protection</h3>
          <h4>General information</h4>
          <p className={styles.description}>
            The following information will provide you with an easy to navigate
            overview of what will happen with your personal data when you visit
            this website. The term “personal data” comprises all data that can
            be used to personally identify you. For detailed information about
            the subject matter of data protection, please consult our Data
            Protection Declaration, which we have included beneath this copy.
          </p>
          <h4>Data recording on this website</h4>
          <p>
            Who is the responsible party for the recording of data on this
            website (i.e. the “controller”)? The data on this website is
            processed by the operator of the website, whose contact information
            is available under section “Information Required by Law” on this
            website.
          </p>
          <h4>How do we record your data?</h4>
          <p>
            We collect your data as a result of your sharing of your data with
            us. This may, for instance be information you enter into our contact
            form. Other data shall be recorded by our IT systems automatically
            or after you consent to its recording during your website visit.
            This data comprises primarily technical information (e.g. web
            browser, operating system or time the site was accessed). This
            information is recorded automatically when you access this website.
          </p>
          <p>
            What are the purposes we use your data for? <br /> A portion of the
            information is generated to guarantee the error free provision of
            the website. Other data may be used to analyze your user patterns.
          </p>
          <p>
            What rights do you have as far as your information is concerned?
          </p>
          <p>
            You have the right to receive information about the source,
            recipients and purposes of your archived personal data at any time
            without having to pay a fee for such disclosures. You also have the
            right to demand that your data are rectified or eradicated. If you
            have consented to data processing, you have the option to revoke
            this consent at any time, which shall affect all future data
            processing. Moreover, you have the right to demand that the
            processing of your data be restricted under certain circumstances.
            Furthermore, you have the right to log a complaint with the
            competent supervising agency.
          </p>
          <p>
            Please do not hesitate to contact us at any time under the address
            disclosed in section “Information Required by Law” on this website
            if you have questions about this or any other data protection
            related issues.
          </p>
          <h4>Analysis tools and tools provided by third parties</h4>
          <p>
            There is a possibility that your browsing patterns will be
            statistically analyzed when your visit this website. Such analyses
            are performed primarily with what we refer to as analysis programs.
            For detailed information about these analysis programs please
            consult our Data Protection Declaration below.
          </p>
          <h3>2. General information and mandatory information</h3>
          <h4>Data protection</h4>
          <p>
            The operators of this website and its pages take the protection of
            your personal data very seriously. Hence, we handle your personal
            data as confidential information and in compliance with the
            statutory data protection regulations and this Data Protection
            Declaration.
          </p>
          <p>
            Whenever you use this website, a variety of personal information
            will be collected. Personal data comprises data that can be used to
            personally identify you. This Data Protection Declaration explains
            which data we collect as well as the purposes we use this data for.
            It also explains how, and for which purpose the information is
            collected.
          </p>
          <p>
            We herewith advise you that the transmission of data via the
            Internet (i.e. through e-mail communications) may be prone to
            security gaps. It is not possible to completely protect data against
            third-party access.
          </p>
          <p>
            Information about the responsible party (referred to as the
            “controller” in the GDPR) The data processing controller on this
            website is: <br /> Nefentus Solutions LTD <br /> Faneromenis Avenue
            85, Ria Court 46, Office 301, 6025 Larnaca <br /> E-mail:
            office@nefentus.com
          </p>
          <p>
            The controller is the natural person or legal entity that
            single-handedly or jointly with others makes decisions as to the
            purposes of and resources for the processing of personal data (e.g.
            names, e-mail addresses, etc.).
          </p>
          <h4>Storage duration</h4>
          <p>
            Unless a more specific storage period has been specified in this
            privacy policy, your personal data will remain with us until the
            purpose for which it was collected no longer applies. If you assert
            a justified request for deletion or revoke your consent to data
            processing, your data will be deleted, unless we have other legally
            permissible reasons for storing your personal data (e.g. tax or
            commercial law retention periods); in the latter case, the deletion
            will take place after these reasons cease to apply.
          </p>
          <h3>Information on data transfer to the USA</h3>
          <p>
            Our website uses, in particular, tools from companies based in the
            USA. When these tools are active, your personal information may be
            transferred to the US servers of these companies. We must point out
            that the USA is not a safe third country within the meaning of EU
            data protection law. US companies are required to release personal
            data to security authorities without you as the data subject being
            able to take legal action against this. The possibility cannot
            therefore be excluded that US authorities (e.g. secret services) may
            process, evaluate and permanently store your data on US servers for
            monitoring purposes. We have no influence over these processing
            activities.
          </p>
          <h4>Revocation of your consent to the processing of data</h4>
          <p>
            A wide range of data processing transactions are possible only
            subject to your express consent. You can also revoke at any time any
            consent you have already given us. This shall be without prejudice
            to the lawfulness of any data collection that occurred prior to your
            revocation.
          </p>
          <p>
            Right to object to the collection of data in special cases; right to
            object to direct advertising (Art. 21 GDPR)
          </p>
          <p>
            IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6 SECT. 1
            LIT. E OR F GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE
            PROCESSING OF YOUR PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR
            UNIQUE SITUATION. THIS ALSO APPLIES TO ANY PROFILING BASED ON THESE
            PROVISIONS. TO DETERMINE THE LEGAL BASIS, ON WHICH ANY PROCESSING OF
            DATA IS BASED, PLEASE CONSULT THIS DATA PROTECTION DECLARATION. IF
            YOU LOG AN OBJECTION, WE WILL NO LONGER PROCESS YOUR AFFECTED
            PERSONAL DATA, UNLESS WE ARE IN A POSITION TO PRESENT COMPELLING
            PROTECTION WORTHY GROUNDS FOR THE PROCESSING OF YOUR DATA, THAT
            OUTWEIGH YOUR INTERESTS, RIGHTS AND FREEDOMS OR IF THE PURPOSE OF
            THE PROCESSING IS THE CLAIMING, EXERCISING OR DEFENCE OF LEGAL
            ENTITLEMENTS (OBJECTION PURSUANT TO ART. 21 SECT. 1 GDPR).
          </p>
          <p>
            IF YOUR PERSONAL DATA IS BEING PROCESSED IN ORDER TO ENGAGE IN
            DIRECT ADVERTISING, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE
            PROCESSING OF YOUR AFFECTED PERSONAL DATA FOR THE PURPOSES OF SUCH
            ADVERTISING. THIS ALSO APPLIES TO PROFILING TO THE EXTENT THAT IT IS
            AFFILIATED WITH SUCH DIRECT ADVERTISING. IF YOU OBJECT, YOUR
            PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR DIRECT
            ADVERTISING PURPOSES (OBJECTION PURSUANT TO ART. 21 SECT. 2 GDPR).
          </p>
          <h4>
            Right to log a complaint with the competent supervisory agency
          </h4>
          <p>
            In the event of violations of the GDPR, data subjects are entitled
            to log a complaint with a supervisory agency, in particular in the
            member state where they usually maintain their domicile, place of
            work or at the place where the alleged violation occurred. The right
            to log a complaint is in effect regardless of any other
            administrative or court proceedings available as legal recourses.
          </p>
          <h4>Right to data portability</h4>
          <p>
            You have the right to demand that we hand over any data we
            automatically process on the basis of your consent or in order to
            fulfil a contract be handed over to you or a third party in a
            commonly used, machine readable format. If you should demand the
            direct transfer of the data to another controller, this will be done
            only if it is technically feasible.
          </p>
          <h4>SSL and/or TLS encryption</h4>
          <p>
            For security reasons and to protect the transmission of confidential
            content, such as purchase orders or inquiries you submit to us as
            the website operator, this website uses either an SSL or a TLS
            encryption program. You can recognize an encrypted connection by
            checking whether the address line of the browser switches from
            “http://” to “https://” and also by the appearance of the lock icon
            in the browser line.If the SSL or TLS encryption is activated, data
            you transmit to us cannot be read by third parties.
          </p>
          <h4>Encrypted payment transactions on this website</h4>
          <p>
            If you are under an obligation to share your payment information
            (e.g. account number if you give us the authority to debit your bank
            account) with us after you have entered into a fee-based contract
            with us, this information is required to process payments.
          </p>
          <p>
            Payment transactions using common modes of paying (Visa/MasterCard,
            debit to your bank account) are processed exclusively via encrypted
            SSL or TLS connections. You can recognize an encrypted connection by
            checking whether the address line of the browser switches from
            “http://” to “https://” and also by the appearance of the lock icon
            in the browser line.
          </p>
          <p>
            If the communication with us is encrypted, third parties will not be
            able to read the payment information you share with us.
          </p>
          <h4>Information about, rectification and eradication of data</h4>
          <p>
            Within the scope of the applicable statutory provisions, you have
            the right to at any time demand information about your archived
            personal data, their source and recipients as well as the purpose of
            the processing of your data. You may also have a right to have your
            data rectified or eradicated. If you have questions about this
            subject matter or any other questions about personal data, please do
            not hesitate to contact us at any time at the address provided in
            section “Information Required by Law.”
          </p>
          <h4>Right to demand processing restrictions</h4>
          <p>
            You have the right to demand the imposition of restrictions as far
            as the processing of your personal data is concerned. To do so, you
            may contact us at any time at the address provided in section
            “Information Required by Law.” The right to demand restriction of
            processing applies in the following cases:
          </p>
          <p>
            In the event that you should dispute the correctness of your data
            archived by us, we will usually need some time to verify this claim.
            During the time that this investigation is ongoing, you have the
            right to demand that we restrict the processing of your personal
            data.
          </p>
          <p>
            If the processing of your personal data was/is conducted in an
            unlawful manner, you have the option to demand the restriction of
            the processing of your data in lieu of demanding the eradication of
            this data.
          </p>
          <p>
            If we do not need your personal data any longer and you need it to
            exercise, defend or claim legal entitlements, you have the right to
            demand the restriction of the processing of your personal data
            instead of its eradication.
          </p>
          <p>
            If you have raised an objection pursuant to Art. 21 Sect. 1 GDPR,
            your rights and our rights will have to be weighed against each
            other. As long as it has not been determined whose interests
            prevail, you have the right to demand a restriction of the
            processing of your personal data.
          </p>
          <p>
            If you have restricted the processing of your personal data, these
            data – with the exception of their archiving – may be processed only
            subject to your consent or to claim, exercise or defend legal
            entitlements or to protect the rights of other natural persons or
            legal entities or for important public interest reasons cited by the
            European Union or a member state of the EU.
          </p>
          <h4>Rejection of unsolicited e-mails</h4>
          <p>
            We herewith object to the use of contact information published in
            conjunction with the mandatory information to be provided in section
            “Information Required by Law” to send us promotional and information
            material that we have not expressly requested. The operators of this
            website and its pages reserve the express right to take legal action
            in the event of the unsolicited sending of promotional information,
            for instance via SPAM messages.
          </p>
          <h3>3. Recording of data on this website</h3>
          <h4>Cookies</h4>
          <p>
            Our websites and pages use what the industry refers to as “cookies.”
            Cookies are small text files that do not cause any damage to your
            device. They are either stored temporarily for the duration of a
            session (session cookies) or they are permanently archived on your
            device (permanent cookies). Session cookies are automatically
            deleted once you terminate your visit. Permanent cookies remain
            archived on your device until you actively delete them or they are
            automatically eradicated by your web browser.
          </p>
          <p>
            In some cases, it is possible that third-party cookies are stored on
            your device once you enter our site (third-party cookies). These
            cookies enable you or us to take advantage of certain services
            offered by the third party (e.g. cookies for the processing of
            payment services).
          </p>
          <p>
            Cookies have a variety of functions. Many cookies are technically
            essential since certain website functions would not work in the
            absence of the cookies (e.g. the shopping cart function or the
            display of videos). The purpose of other cookies may be the analysis
            of user patterns or the display of promotional messages.
          </p>
          <p>
            Cookies, which are required for the performance of electronic
            communication transactions (required cookies) or for the provision
            of certain functions you want to use (functional cookies, e.g. for
            the shopping cart function) or those that are necessary for the
            optimization of the website (e.g. cookies that provide measurable
            insights into the web audience), shall be stored on the basis of
            Art. 6 Sect. 1 lit. f GDPR, unless a different legal basis is cited.
            The operator of the website has a legitimate interest in the storage
            of cookies to ensure the technically error free and optimized
            provision of the operator’s services. If your consent to the storage
            of the cookies has been requested, the respective cookies are stored
            exclusively on the basis of the consent obtained (Art. 6 Sect. 1
            lit. a GDPR); this consent may be revoked at any time.
          </p>
          <p>
            You have the option to set up your browser in such a manner that you
            will be notified any time cookies are placed and to permit the
            acceptance of cookies only in specific cases. You may also exclude
            the acceptance of cookies in certain cases or in general or activate
            the delete function for the automatic eradication of cookies when
            the browser closes. If cookies are deactivated, the functions of
            this website may be limited.
          </p>
          <p>
            In the event that third-party cookies are used or if cookies are
            used for analytical purposes, we will separately notify you in
            conjunction with this Data Protection Policy and, if applicable, ask
            for your consent.
          </p>
          <h4>Server log files</h4>
          <p>
            The provider of this website and its pages automatically collects
            and stores information in so-called server log files, which your
            browser communicates to us automatically. The information comprises:
          </p>
          <p>The type and version of browser used</p>
          <p>The used operating system</p>
          <p>Referrer URL</p>
          <p>The hostname of the accessing computer</p>
          <p>The time of the server inquiry</p>
          <p>The IP address</p>
          <p>This data is not merged with other data sources.</p>
          <p>
            This data is recorded on the basis of Art. 6 Sect. 1 lit. f GDPR.
            The operator of the website has a legitimate interest in the
            technically error free depiction and the optimization of the
            operator’s website. In order to achieve this, server log files must
            be recorded.
          </p>
          <h4>Contact form</h4>
          <p>
            If you submit inquiries to us via our contact form, the information
            provided in the contact form as well as any contact information
            provided therein will be stored by us in order to handle your
            inquiry and in the event that we have further questions. We will not
            share this information without your consent.
          </p>
          <p>
            The processing of these data is based on Art. 6 para. 1 lit. b GDPR,
            if your request is related to the execution of a contract or if it
            is necessary to carry out pre-contractual measures. In all other
            cases the processing is based on our legitimate interest in the
            effective processing of the requests addressed to us (Art. 6 Para. 1
            lit. f GDPR) or on your agreement (Art. 6 Para. 1 lit. a GDPR) if
            this has been requested.
          </p>
          <p>
            The information you have entered into the contact form shall remain
            with us until you ask us to eradicate the data, revoke your consent
            to the archiving of data or if the purpose for which the information
            is being archived no longer exists (e.g. after we have concluded our
            response to your inquiry). This shall be without prejudice to any
            mandatory legal provisions – in particular retention periods.
          </p>
          <h4>Request by e-mail, telephone or fax</h4>
          <p>
            If you contact us by e-mail, telephone or fax, your request,
            including all resulting personal data (name, request) will be stored
            and processed by us for the purpose of processing your request. We
            do not pass these data on without your consent.
          </p>
          <p>
            These data are processed on the basis of Art. 6 Sect. 1 lit. b GDPR
            if your inquiry is related to the fulfillment of a contract or is
            required for the performance of pre-contractual measures. In all
            other cases, the data are processed on the basis of our legitimate
            interest in the effective handling of inquiries submitted to us
            (Art. 6 Sect. 1 lit. f GDPR) or on the basis of your consent (Art. 6
            Sect. 1 lit. a GDPR) if it has been obtained.
          </p>
          <p>
            The data sent by you to us via contact requests remain with us until
            you request us to delete, revoke your consent to the storage or the
            purpose for the data storage lapses (e.g. after completion of your
            request). Mandatory statutory provisions - in particular statutory
            retention periods - remain unaffected.
          </p>
          <h4>Registration on this website</h4>
          <p>
            You have the option to register on this website to be able to use
            additional website functions. We shall use the data you enter only
            for the purpose of using the respective offer or service you have
            registered for. The required information we request at the time of
            registration must be entered in full. Otherwise we shall reject the
            registration.
          </p>
          <p>
            To notify you of any important changes to the scope of our portfolio
            or in the event of technical modifications, we shall use the e-mail
            address provided during the registration process.
          </p>
          <p>
            We shall process the data entered during the registration process on
            the basis of your consent (Art. 6 Sect. 1 lit. a GDPR).
          </p>
          <p>
            The data recorded during the registration process shall be stored by
            us as long as you are registered on this website. Subsequently, such
            data shall be deleted. This shall be without prejudice to mandatory
            statutory retention obligations.
          </p>
          <h3>4. Social media</h3>
          <h4>LinkedIn plug-in</h4>
          <p>
            This website uses functions of the LinkedIn network. The provider is
            LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place,
            Dublin 2, Ireland.
          </p>
          <p>
            Any time you access a page of this website that contains functions
            of LinkedIn, a connection to LinkedIn’s servers is established.
            LinkedIn is notified that you have visited this website with your IP
            address. If you click on LinkedIn’s “Recommend” button and are
            logged into your LinkedIn account at the time, LinkedIn will be in a
            position to allocate your visit to this website to your user
            account. We have to point out that we as the provider of the
            websites do not have any knowledge of the content of the transferred
            data and its use by LinkedIn.
          </p>
          <p>
            The use of the LinkedIn plug-in is based on Art. 6 Sect. 1 lit. f
            GDPR. The operator of the website has a legitimate interest in being
            as visible as possible on social media. If a respective declaration
            of consent has been obtained, the data shall be processed
            exclusively on the basis of Art. 6 Sect. 1 lit. a GDPR. This
            declaration of consent may be revoked at any time.
          </p>
          <p>
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:
            https://www.linkedin.com/legal/l/dpa and
            https://www.linkedin.com/legal/l/eu-sccs.
          </p>
          <p>
            For further information on this subject, please consult LinkedIn’s
            Data Privacy Declaration at:
            https://www.linkedin.com/legal/privacy-policy.
          </p>
          <h3>5. Analysis tools and advertising</h3>
          <h4>Google Analytics</h4>
          <p>
            This website uses functions of the web analysis service Google
            Analytics. The provider of this service is Google Ireland Limited
            (“Google”), Gordon House, Barrow Street, Dublin 4, Ireland.
          </p>
          <p>
            Google Analytics enables the website operator to analyze the
            behavior patterns of website visitors. To that end, the website
            operator receives a variety of user data, such as pages accessed,
            time spent on the page, the utilized operating system and the user’s
            origin. Google may consolidate these data in a profile that is
            allocated to the respective user or the user’s device.
          </p>
          <p>
            Google Analytics uses technologies that make the recognition of the
            user for the purpose of analyzing the user behavior patterns (e.g.
            cookies or device fingerprinting). The website use information
            recorded by Google is, as a rule transferred to a Google server in
            the United States, where it is stored.
          </p>
          <p>
            This analysis tool is used on the basis of Art. 6 Sect. 1 lit. f
            GDPR. The operator of this website has a legitimate interest in the
            analysis of user patterns to optimize both, the services offered
            online and the operator’s advertising activities. If a corresponding
            agreement has been requested (e.g. an agreement to the storage of
            cookies), the processing takes place exclusively on the basis of
            Art. 6 para. 1 lit. a GDPR; the agreement can be revoked at any
            time.
          </p>
          <p>
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:
            https://privacy.google.com/businesses/controllerterms/mccs/.
          </p>
          <h4>IP anonymization</h4>
          <p>
            On this website, we have activated the IP anonymization function. As
            a result, your IP address will be abbreviated by Google within the
            member states of the European Union or in other states that have
            ratified the Convention on the European Economic Area prior to its
            transmission to the United States. The full IP address will be
            transmitted to one of Google’s servers in the United States and
            abbreviated there only in exceptional cases. On behalf of the
            operator of this website, Google shall use this information to
            analyze your use of this website to generate reports on website
            activities and to render other services to the operator of this
            website that are related to the use of the website and the Internet.
            The IP address transmitted in conjunction with Google Analytics from
            your browser shall not be merged with other data in Google’s
            possession.
          </p>
          <h4>Browser plug-in</h4>
          <p>
            You can prevent the recording and processing of your data by Google
            by downloading and installing the browser plugin available under the
            following link: https://tools.google.com/dlpage/gaoptout?hl=en.
          </p>
          <p>
            For more information about the handling of user data by Google
            Analytics, please consult Google’s Data Privacy Declaration at:
            https://support.google.com/analytics/answer/6004245?hl=en.
          </p>
          <h4>Contract data processing</h4>
          <p>
            We have executed a contract data processing agreement with Google
            and are implementing the stringent provisions of the German data
            protection agencies to the fullest when using Google Analytics.
          </p>
          <h4>Archiving period</h4>
          <p>
            Data on the user or incident level stored by Google linked to
            cookies, user IDs or advertising IDs (e.g. DoubleClick cookies,
            Android advertising ID) will be anonymized or deleted after 14
            month. For details please click the following link:
            https://support.google.com/analytics/answer/7667196?hl=en
          </p>
          <h4>IONOS Web Analytics</h4>
          <p>
            This website uses IONOS Web Analytics analysis services. The
            provider of these services is 1&1 IONOS SE, Elgendorfer Straße 57,
            56410 Montabaur, Germany. In conjunction with the performance of
            analyses by IONOS, it is possible to e.g. analyze the number of
            visitors and their behavior patterns during visits (e.g. number of
            pages accessed, duration of their visits to the website, percentage
            of aborted visits), visitor origins (i.e. from which site does the
            visitor arrive at our site), visitor locations as well as technical
            data (browser and session of operating system used). For these
            purposes, IONOS archives in particular the following data:
          </p>
          <p>Referrer (previously visited website)</p>
          <p>Accessed page on the website or file</p>
          <p>Browser type and browser version</p>
          <p>Used operating system</p>
          <p>Type of device used</p>
          <p>Website access time</p>
          <p>
            Anonymized IP address (used only to determine the access location)
          </p>
          <p>
            According to IONOS, the data recorded are completely anonymized so
            they cannot be tracked back to individuals. IONOS Web Analytics does
            not archive cookies.
          </p>
          <p>
            The data are stored and analyzed pursuant to Art. 6 Sect. 1 lit. f
            GDPR. The operator of the website has a legitimate interest in the
            statistical analysis of user patterns to optimize both, the
            operator’s web presentation as well as the operator’s promotional
            activities. If a corresponding agreement has been requested, the
            processing takes place exclusively on the basis of Art. 6 para. 1
            lit. a GDPR; the agreement can be revoked at any time.
          </p>
          <p>
            For more information affiliated with the recording and processing of
            data by IONOS Web Analytics, please click on the following link of
            the data policy declaration:
          </p>
          <p>https://www.ionos.de/terms-gtc/index.php?id=6.</p>
          <h4>Contract data processing</h4>
          <p>
            We have executed a contract data processing agreement with IONOS.
            The aim of this contract is to ensure the data protection regulation
            compliant handling of your personal data by IONOS.
          </p>
          <h4>Google Ads</h4>
          <p>
            The website operator uses Google Ads. Google Ads is an online
            promotional program of Google Ireland Limited (“Google”), Gordon
            House, Barrow Street, Dublin 4, Ireland.
          </p>
          <p>
            Google Ads enables us to display ads in the Google search engine or
            on third-party websites, if the user enters certain search terms
            into Google (keyword targeting). It is also possible to place
            targeted ads based on the user data Google has in its possession
            (e.g. location data and interests; target group targeting). As the
            website operator, we can analyze these data quantitatively, for
            instance by analyzing which search terms resulted in the display of
            our ads and how many ads led to respective clicks.
          </p>
          <p>
            The use of Google Ads is based on Art. 6 Sect. 1 lit. et seq. GDPR.
            The website operator has a legitimate interest in marketing the
            operator’s services and products as effectively as possible.
          </p>
          <p>
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:
            https://privacy.google.com/businesses/controllerterms/mccs/.
          </p>
          <h4>Google Remarketing</h4>
          <p>
            This website uses the functions of Google Analytics Remarketing. The
            provider of these solutions is Google Ireland Limited (“Google”),
            Gordon House, Barrow Street, Dublin 4, Ireland.
          </p>
          <p>
            Google Remarketing analyzes your user patterns on our website (e.g.
            clicks on specific products), to allocate a certain advertising
            target groups to you and to subsequently display matching online
            offers to you when you visit other online offers (remarketing or
            retargeting).
          </p>
          <p>
            Moreover, it is possible to link the advertising target groups
            generated with Google Remarketing to device encompassing functions
            of Google. This makes it possible to display interest-based
            customized advertising messages, depending on your prior usage and
            browsing patterns on a device (e.g. cell phone) in a manner tailored
            to you as well as on any of your devices (e.g. tablet or PC).
          </p>
          <p>
            If you have a Google account, you have the option to object to
            personalized advertising under the following link:
            https://www.google.com/settings/ads/onweb/.
          </p>
          <p>
            The use of Google Remarketing is based on Art. 6 1 lit. et seq.
            GDPR. The website operator has a legitimate interest in the
            marketing of the operator’s products that is as effective as
            possible. If a respective declaration of consent was requested,
            processing shall occur exclusively on the basis of Art. 6 Sect. 1
            lit. a GDPR; the given consent may be revoked at any time.
          </p>
          <p>
            For further information and the pertinent data protection
            regulations, please consult the Data Privacy Policies of Google at:
            https://policies.google.com/technologies/ads?hl=en.
          </p>
          <h4>Google Conversion-Tracking</h4>
          <p>
            This website uses Google Conversion Tracking. The provider of this
            service is Google Ireland Limited (“Google”), Gordon House, Barrow
            Street, Dublin 4, Ireland.
          </p>
          <p>
            With the assistance of Google Conversion Tracking we are in a
            position to recognize whether the user has completed certain
            actions. For instance, we can analyze the how frequently which
            buttons on our website have been clicked and which products are
            reviewed or purchased with particular frequency. The purpose of this
            information is to compile conversion statistics. We learn how many
            users have clicked on our ads and which actions they have completed.
            We do not receive any information that would allow us to personally
            identify the users. Google as such uses cookies or comparable
            recognition technologies for identification purposes.
          </p>
          <p>
            We use Google Conversion Tracking on the basis of Art. 6 Sect. 1
            lit. et seq. GDPR. The operator of the website has a legitimate
            interest in the analysis of the user patterns with the aim of
            optimizing both, the operator’s web presentation and advertising. If
            a respective declaration of consent was requested (e.g. concerning
            the storage of cookies), processing shall occur exclusively on the
            basis of Art. 6 Sect. 1 lit. a GDPR; the given consent may be
            revoked at any time.
          </p>
          <p>
            For more information about Google Conversion Tracking, please review
            Google’s data protection policy at:
            https://policies.google.com/privacy?hl=en
          </p>
          <h4>Facebook Pixel</h4>
          <p>
            To measure conversion rates, this website uses the visitor activity
            pixel of Facebook. The provider of this service is Facebook Ireland
            Limited, 4 Grand Canal Square, Dublin 2, Ireland. According to
            Facebook’s statement the collected data will be transferred to the
            USA and other third-party countries too.
          </p>
          <p>
            This tool allows the tracking of page visitors after they have been
            linked to the website of the provider after clicking on a Facebook
            ad. This makes it possible to analyze the effectiveness of Facebook
            ads for statistical and market research purposes and to optimize
            future advertising campaigns.
          </p>
          <p>
            For us as the operators of this website, the collected data is
            anonymous. We are not in a position to arrive at any conclusions as
            to the identity of users. However, Facebook archives the information
            and processes it, so that it is possible to make a connection to the
            respective user profile and Facebook is in a position to use the
            data for its own promotional purposes in compliance with the
            Facebook Data Usage Policy. This enables Facebook to display ads on
            Facebook pages as well as in locations outside of Facebook. We as
            the operator of this website have no control over the use of such
            data.
          </p>
          <p>
            The use of Facebook Pixel is based on Art. 6 Sect. 1 lit. f GDPR.
            The operator of the website has a legitimate interest in effective
            advertising campaigns, which also include social media. If a
            corresponding agreement has been requested (e.g. an agreement to the
            storage of cookies), the processing takes place exclusively on the
            basis of Art. 6 para. 1 lit. a GDPR; the agreement can be revoked at
            any time.
          </p>
          <p>
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:
            https://www.facebook.com/legal/EU_data_transfer_addendum und
            https://de-de.facebook.com/help/566994660333381.
          </p>
          <p>
            In Facebook’s Data Privacy Policies, you will find additional
            information about the protection of your privacy at:
            https://www.facebook.com/about/privacy/.
          </p>
          <p>
            You also have the option to deactivate the remarketing function
            “Custom Audiences” in the ad settings section under
            https://www.facebook.com/ads/preferences/?entry_product=ad_settings_screen.
            To do this, you first have to log into Facebook.
          </p>
          <p>
            If you do not have a Facebook account, you can deactivate any user
            based advertising by Facebook on the website of the European
            Interactive Digital Advertising Alliance:
            http://www.youronlinechoices.com/de/praferenzmanagement/.
          </p>
          <h3>6. Newsletter</h3>
          <h4>Newsletter data</h4>
          <p>
            If you would like to subscribe to the newsletter offered on this
            website, we will need from you an e-mail address as well as
            information that allow us to verify that you are the owner of the
            e-mail address provided and consent to the receipt of the
            newsletter. No further data shall be collected or shall be collected
            only on a voluntary basis. We shall use such data only for the
            sending of the requested information and shall not share such data
            with any third parties.
          </p>
          <p>
            The processing of the information entered into the newsletter
            subscription form shall occur exclusively on the basis of your
            consent (Art. 6 Sect. 1 lit. a GDPR). You may revoke the consent you
            have given to the archiving of data, the e-mail address and the use
            of this information for the sending of the newsletter at any time,
            for instance by clicking on the “Unsubscribe” link in the
            newsletter. This shall be without prejudice to the lawfulness of any
            data processing transactions that have taken place to date.
          </p>
          <p>
            The data deposited with us for the purpose of subscribing to the
            newsletter will be stored by us until you unsubscribe from the
            newsletter or the newsletter service provider and deleted from the
            newsletter distribution list after you unsubscribe from the
            newsletter. Data stored for other purposes with us remain
            unaffected.
          </p>
          <p>
            After you unsubscribe from the newsletter distribution list, your
            e-mail address may be stored by us or the newsletter service
            provider in a blacklist to prevent future mailings. The data from
            the blacklist is used only for this purpose and not merged with
            other data. This serves both your interest and our interest in
            complying with the legal requirements when sending newsletters
            (legitimate interest within the meaning of Art. 6 para. 1 lit. f
            GDPR). The storage in the blacklist is indefinite. You may object to
            the storage if your interests outweigh our legitimate interest.
          </p>
          <h3>
            7. Online-based Audio and Video Conferences (Conference tools)
          </h3>
          <h4>Data processing</h4>
          <p>
            We use online conference tools, among other things, for
            communication with our customers. The tools we use are listed in
            detail below. If you communicate with us by video or audio
            conference using the Internet, your personal data will be collected
            and processed by the provider of the respective conference tool and
            by us. The conferencing tools collect all information that you
            provide/access to use the tools (email address and/or your phone
            number). Furthermore, the conference tools process the duration of
            the conference, start and end (time) of participation in the
            conference, number of participants and other “context information”
            related to the communication process (metadata).
          </p>
          <p>
            Furthermore, the provider of the tool processes all the technical
            data required for the processing of the online communication. This
            includes, in particular, IP addresses, MAC addresses, device IDs,
            device type, operating system type and version, client version,
            camera type, microphone or loudspeaker and the type of connection.
          </p>
          <p>
            Should content be exchanged, uploaded or otherwise made available
            within the tool, it is also stored on the servers of the tool
            provider. Such content includes, but is not limited to, cloud
            recordings, chat/ instant messages, voicemail uploaded photos and
            videos, files, whiteboards and other information shared while using
            the service.
          </p>
          <p>
            Please note that we do not have complete influence on the data
            processing procedures of the tools used. Our possibilities are
            largely determined by the corporate policy of the respective
            provider. Further information on data processing by the conference
            tools can be found in the data protection declarations of the tools
            used, and which we have listed below this text.
          </p>

          <h4>Purpose and legal bases</h4>

          <p>
            The conference tools are used to communicate with prospective or
            existing contractual partners or to offer certain services to our
            customers (Art. 6 para. 1 sentence 1 lit. b GDPR). Furthermore, the
            use of the tools serves to generally simplify and accelerate
            communication with us or our company (legitimate interest in the
            meaning of Art. 6 para. 1 lit. f GDPR). Insofar as consent has been
            requested, the tools in question will be used on the basis of this
            consent; the consent may be revoked at any time with effect from
            that date.
          </p>

          <h4>Duration of storage</h4>

          <p>
            Data collected directly by us via the video and conference tools
            will be deleted from our systems immediately after you request us to
            delete it, revoke your consent to storage, or the reason for storing
            the data no longer applies. Stored cookies remain on your end device
            until you delete them. Mandatory legal retention periods remain
            unaffected.
          </p>

          <p>
            We have no influence on the duration of storage of your data that is
            stored by the operators of the conference tools for their own
            purposes. For details, please contact directly the operators of the
            conference tools.
          </p>

          <p>Conference tools used</p>

          <p>We employ the following conference tools:</p>

          <h4>Zoom</h4>

          <p>
            We use Zoom. The provider of this service is Zoom Communications
            Inc, San Jose, 55 Almaden Boulevard, 6th Floor, San Jose, CA 95113,
            USA. For details on data processing, please refer to Zoom’s privacy
            policy: https://zoom.us/en-us/privacy.html.
          </p>

          <p>
            Data transmission to the US is based on the Standard Contractual
            Clauses (SCC) of the European Commission. Details can be found here:
            https://zoom.us/de-de/privacy.html.
          </p>

          <h3>8. Custom Services</h3>

          <h4>Job Applications</h4>

          <p>
            We offer website visitors the opportunity to submit job applications
            to us (e.g. via e-mail, via postal services on by submitting the
            online job application form). Below, we will brief you on the scope,
            purpose and use of the personal data collected from you in
            conjunction with the application process. We assure you that the
            collection, processing and use of your data will occur in compliance
            with the applicable data privacy rights and all other statutory
            provisions and that your data will always be treated as strictly
            confidential.
          </p>

          <h4>Scope and purpose of the collection of data</h4>

          <p>
            If you submit a job application to us, we will process any
            affiliated personal data (e.g. contact and communications data,
            application documents, notes taken during job interviews, etc.), if
            they are required to make a decision concerning the establishment or
            an employment relationship. The legal grounds for the aforementioned
            are § 26 New GDPR according to German Law (Negotiation of an
            Employment Relationship), Art. 6 Sect. 1 lit. b GDPR (General
            Contract Negotiations) and – provided you have given us your consent
            – Art. 6 Sect. 1 lit. a GDPR. You may revoke any consent given at
            any time. Within our company, your personal data will only be shared
            with individuals who are involved in the processing of your job
            application.
          </p>

          <p>
            If your job application should result in your recruitment, the data
            you have submitted will be archived on the grounds of § 26 New GDPR
            and Art. 6 Sect. 1 lit. b GDPR for the purpose of implementing the
            employment relationship in our data processing system.
          </p>

          <h4>Data Archiving Period</h4>

          <p>
            If we are unable to make you a job offer or you reject a job offer
            or withdraw your application, we reserve the right to retain the
            data you have submitted on the basis of our legitimate interests
            (Art. 6 para. 1 lit. f GDPR) for up to 6 months from the end of the
            application procedure (rejection or withdrawal of the application).
            Afterwards the data will be deleted, and the physical application
            documents will be destroyed. The storage serves in particular as
            evidence in the event of a legal dispute. If it is evident that the
            data will be required after the expiry of the 6-month period (e.g.
            due to an impending or pending legal dispute), deletion will only
            take place when the purpose for further storage no longer applies.
          </p>

          <p>
            Longer storage may also take place if you have given your agreement
            (Article 6 (1) (a) GDPR) or if statutory data retention requirements
            preclude the deletion.
          </p>

          <h4>Admission to the applicant pool</h4>

          <p>
            If we do not make you a job offer, you may be able to join our
            applicant pool. In case of admission, all documents and information
            from the application will be transferred to the applicant pool in
            order to contact you in case of suitable vacancies.
          </p>

          <p>
            Admission to the applicant pool is based exclusively on your express
            agreement (Art. 6 para. 1 lit. a GDPR). The submission agreement is
            voluntary and has no relation to the ongoing application procedure.
            The affected person can revoke his agreement at any time. In this
            case, the data from the applicant pool will be irrevocably deleted,
            provided there are no legal reasons for storage.
          </p>

          <p>
            The data from the applicant pool will be irrevocably deleted no
            later than two years after consent has been granted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyBody;
