const PrivacyAndPolicyPage = () => {
  return (
    <section>
      <div className="flex flex-col animate-floatIn items-center justify-center px-5 md:px-10">
        {/* Title Container */}
        <div className="flex h-auto min-w-[100vw] flex-col items-center justify-end bg-[#f2f2f7] py-6 md:h-64">
          <div className="flex flex-col items-center gap-y-4 py-5">
            <h1 className="text-3xl font-bold md:text-5xl font-proxima">
              Privacy &amp; Policy
            </h1>
            {/* <p className="text-sm text-[#808080] sm:text-base">
              Last Updated as of October 17, 2022
            </p> */}
          </div>
        </div>
        {/* Content Container */}
        <div className="mx-auto w-full max-w-5xl py-12 md:py-16 lg:py-20">
          {/* Component */}
          <div className="flex flex-col items-center gap-y-14">
            <p className="max-w-5xl text-center text-sm sm:text-base">
              This privacy policy (this &quot;Privacy Policy&quot;) explains how
              personal information is collected, used, stored, and disclosed by
              Vcorp Systems Limited, (&quot;MyFund,&quot; &quot;we,&quot;
              &quot;us,&quot; and &quot;our&quot;). This Privacy Policy applies
              to consumer users (individually referred to as &quot;you&quot;) of
              our websites, applications, and other online services to which
              this Privacy Policy is posted (collectively, our
              &quot;Services&quot;).   This Privacy Policy is part of our Terms
              of Use. By accessing or using our Services, you agree to this
              Privacy Policy and our Terms of Use. The provisions contained in
              this Privacy Policy supersede all previous notices and statements
              regarding our privacy practices with respect to our Services. If
              you do not agree to every provision of this Privacy Policy and our
              Terms of Use, you may not access or use our Services.
            </p>
            <div className="flex min-w-full flex-col gap-y-10">
              <div className="flex min-w-full py-4 [border-bottom:1px_solid_rgb(226,_226,_226)]">
                <h6 className="text-base font-bold">
                  General Privacy &amp; Policy
                </h6>
              </div>
              <div className="flex flex-col gap-y-10">
                <div className="flex min-w-full flex-col items-start gap-y-6">
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Application of this Privacy Policy
                    </p>
                    <p className="text-sm">
                      This Privacy Policy applies to your use of (regardless of
                      means of access) our Services. You may access or use our
                      Services through a desktop, laptop, mobile phone, tablet,
                      or other consumer electronic device (each, a
                      &quot;Device&quot;).
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Information We Collect, Information You Provide Us
                    </p>
                    <p className="text-sm">
                      In general, you can visit https://www.myfundmobile.com
                      without telling us who you are or revealing any
                      information about yourself. When you submit an inquiry via
                      our Services or register for a MyFund account, we may
                      collect personal information from you, which may include
                      your name, email address, mobile phone number, banking
                      information, and other information that identifies you
                      (collectively, &quot;Personal Information&quot;). By
                      providing your Personal Information to us, you expressly
                      agree to our collection, use, storage, and disclosure of
                      such information as described in this Privacy Policy. We
                      may also ask you to create login information for your
                      account (MyFund), such as a username and password. When
                      you provide your mobile phone number, we may ask for your
                      consent to receive text messages relating to our Services
                      at that number.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Information About Your Transactions
                    </p>
                    <p className="text-sm">
                      We collect Personal Information about your transactions
                      with us and others.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Information From Third Parties
                    </p>
                    <p className="text-sm">
                      We also collect Personal Information about you from other
                      companies. For instance, we may receive Personal
                      Information about you from a consumer reporting agency.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Information Automatically Collected
                    </p>
                    <p className="text-sm">
                      We (or our service providers acting on our behalf) may
                      collect information about your use of our Services. This
                      information may include Personal Information as well as
                      statistical information that does not identify you
                      (&quot;Analytics&quot;). Some Analytics may be correlated
                      with Personal Information. When Analytics are, directly or
                      indirectly, associated or combined with Personal
                      Information, such Analytics will be considered Personal
                      Information for purposes of this Privacy Policy.  
                      Information we automatically collect in connection with
                      your access or use of our Services may include: Device
                      Information: We may collect Device-specific information
                      (such as hardware model, operating system version, unique
                      Device identifiers, and mobile network Information,
                      including your mobile phone number). We may associate your
                      Device identifiers or mobile phone number with your
                      account (MyFund). Log Information: We may record or log
                      information from your Devices, their software, and your
                      activity accessing or using our Services. This information
                      may include:{" "}
                      {/* <ul className="list-disc">
                        <li>The Device's Internet Protocol ("IP") address</li>
                        <li>
                          Identification numbers associated with your Devices
                        </li>
                        <li>
                          Device event information, such as crashes, system
                          activity, and hardware settings
                        </li>
                        <li>Location preferences</li>
                        <li>Date and time stamps of transactions</li>
                        <li>System configuration information</li>
                        <li>Other interactions with our Services</li>
                      </ul> */}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Information Collected Through Cookies and Similar
                      Technologies
                    </p>
                    <p className="text-sm">
                      We use cookies to personalize our Services for you and to
                      collect aggregate information about usage of our Services.
                      A cookie is a text file or other local storage identifier
                      provided by your browser or associated applications. We
                      use cookies for record-keeping purposes and to enhance the
                      quality of your use of our Services. The cookies assign
                      random, unique numbers to your Devices to enable our
                      systems to recognize your Devices and to allow us to see
                      how you use our Services. You may search online for
                      additional information about how cookies work.   The
                      cookies we use in connection with our Services include:  
                      {/* <ul className="list-disc">
                        <li>
                          Session cookies: Session cookies are temporary cookies
                          that expire and are automatically erased whenever you
                          close your browser window. We use session cookies to
                          grant users access to content and to enable actions
                          they must be logged into their Your account (MyFund)
                          to perform.
                        </li>

                        <li>
                          Persistent cookies: Persistent cookies usually have an
                          expiration date in the distant future and remain in
                          your browser until they expire or you manually delete
                          them. We use persistent cookies to better understand
                          usage patterns so we can improve our Services. For
                          example, we may use a persistent cookie to associate
                          you with your account (MyFund) or to remember your
                          choices for our Services.
                        </li>

                        <li>
                          Third-party cookies: We permit certain third parties
                          to place cookies through our Services to provide us
                          with better insights into the use of our Services and
                          user demographics and to advertise our Services to
                          you. These third parties may collect information about
                          your online activities over time and across different
                          websites when you access or use our Services. For
                          example, we utilize Google Analytics to analyze usage
                          patterns for our Services. Google Analytics generates
                          a cookie to capture information about your use of our
                          Services, which Google uses to compile reports on
                          website activity for us and to provide other related
                          services. Google may use a portion of your IP address
                          to identify its cookie, but this will not be
                          associated with any other data held by Google. We may
                          also permit third-party service providers to place
                          cookies for our Services, as indicated above, to
                          perform analytic or marketing functions where you are
                          notified of them and you have consented to the usage.
                          We do not control the use of such third-party cookies
                          or the resulting information, and we are not
                          responsible for any actions or policies of such third
                          parties.  
                        </li>
                      </ul> */}
                      By accessing or using our Services, you consent to the
                      placement of cookies on your Devices as described in this
                      Privacy Policy. If you prefer not to receive cookies
                      through our Services, you may control how your browser
                      responds to cookies by adjusting the privacy and security
                      settings of your web browser. Unless you set your browser
                      settings to refuse all cookies, our system may issue
                      cookies when you access or use our Services. If you set
                      your browser settings to refuse all cookies, the
                      performance of certain features of our Services may be
                      limited or not work at all.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Do-Not-Track Signals
                    </p>
                    <p className="text-sm">
                      Do Not Track (&quot;DNT&quot;) is an optional browser
                      setting that allows you to express your preferences
                      regarding tracking by advertisers and other third parties.
                      We do not use technology that recognizes DNT signals from
                      your web browser.{" "}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      How We Use Information
                    </p>
                    <p className="text-sm">
                      We may use Analytics as described elsewhere in this
                      Privacy Policy and for research and commercial purposes,
                      so as to improve our Services.   We may use Personal
                      Information for the purposes described elsewhere in this
                      Privacy Policy and internally for our general commercial
                      purposes, including, among other things, to offer our
                      products and services and products and services of third
                      parties that we think you might find of interest, but only
                      MyFund and our third-party service providers involved in
                      distributing the offers or providing the products or
                      services will have access to your Personal Information.
                      Our third-party service providers will only be permitted
                      to use Personal Information for that intended purpose.  
                      We may use your email address to respond to your inquiries
                      and to provide you information about our Services. You may
                      elect not to receive promotional emails from us either by
                      &quot;unsubscribing&quot; to an email you receive from us
                      or by contacting us as indicated below. If you unsubscribe
                      from receiving emails from us, we may still send you
                      non-promotional emails, such as emails about your account
                      (MyFund) or our ongoing business relations, unless you
                      withdraw your consent to receive electronic communications
                      as provided in our Terms of Use.{" "}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      How We Share Information
                    </p>
                    <p className="text-sm">
                      We do not share your Personal Information with: (1) other
                      financial companies for joint marketing purposes; (2)
                      affiliated companies for their everyday business purposes;
                      or (3) any third parties so they can market to you.   We
                      may share your Personal Information with unaffiliated
                      third parties: (1) if you request or authorize it; (2) if
                      the information is provided to help complete a transaction
                      for you; (3) if the information is provided to: (a) comply
                      with applicable laws, rules, regulations, governmental and
                      quasi-governmental requests, court orders, or subpoenas;
                      (b) enforce our Terms of Use or other agreements; or (c)
                      protect our rights, property, or safety or the rights,
                      property, or safety of our users or others (e.g., to a
                      consumer reporting agency for fraud protection, etc.); (4)
                      if the disclosure is done as part of a purchase, transfer,
                      or sale of services or assets (e.g., in the event that
                      substantially all of our assets are acquired by another
                      party, your Personal Information may be one of the
                      transferred assets); (5) if the information is provided to
                      our third-party service providers to perform functions on
                      our behalf (e.g., analyzing data, providing marketing
                      assistance, providing customer service, processing orders,
                      etc.); (6) for our everyday business purposes; or (7) as
                      permitted by applicable law or otherwise described in this
                      Privacy Policy. When you are no longer our customer, we
                      continue to share your information as described in this
                      Privacy Policy.   We may disclose Analytics with third
                      parties as described elsewhere in this Privacy Policy and
                      for our commercial purposes.{" "}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Opt-Out Rights
                    </p>
                    <p className="text-sm">
                      If you do not wish to receive offers or other notices from
                      us in the future, you can &quot;opt out&quot; by
                      contacting us as indicated at the end of this Privacy
                      Policy or by following the &quot;unsubscribe&quot;
                      instructions in any communication you receive from us.
                      Please be aware that you are not able to opt out of
                      receiving communications about your account (MyFund) or
                      related transactions with us.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Accessing Your Information
                    </p>
                    <p className="text-sm">
                      You must notify us of any change in your Personal
                      Information by updating your account (MyFund) profile
                      through our Services. Any changes will affect only future
                      uses of your Personal Information.   Subject to applicable
                      law, which might, from time to time, oblige us to store
                      your Personal Information for a certain period of time, we
                      will respect your wishes to correct inaccurate
                      information. Otherwise, we will hold your Personal
                      Information for as long as we believe it will help us
                      achieve our objectives as detailed in this Privacy Policy.
                        You can ask us whether we are storing your Personal
                      Information and you can ask to receive a copy of that
                      Personal Information. Before sending you any Personal
                      Information, we will ask you to provide proof of your
                      identity. If you are not able to provide proof of your
                      identity, we reserve the right to refuse to send you any
                      Personal Information. We will respond as quickly as we can
                      to your requests for details of Personal Information we
                      hold about you.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Information You Share Socially
                    </p>
                    <p className="text-sm">
                      Our Services may allow you to connect and share your
                      actions, comments, content, and information publicly or
                      with friends. We are not responsible for maintaining the
                      confidentiality of any information you share publicly or
                      with friends.   Our Services may also allow you to connect
                      with us on, share on, and use third-party websites,
                      applications, and services. Please be mindful of your
                      personal privacy needs and the privacy needs of others, as
                      you choose whom to connect with and what to share and make
                      public. We cannot control the privacy or security of
                      information you choose to make public or share with
                      others. We also do not control the privacy practices of
                      third parties. Please contact those sites and services
                      directly if you want to learn about their privacy
                      practices.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Security
                    </p>
                    <p className="text-sm">
                      MyFund uses the highest levels of Internet Security, and
                      it is secured by 256 bits SSL security encryption to
                      ensure that your information is completely protected from
                      fraud. And in case of a security breach (which
                      doesn&apos;t happen usually happen), an initial backup is
                      set to run daily in the server so we can easily restore
                      all data and regenerate keys. MyFund uses Laravel
                      framework for the app development and Laravel ships with
                      -SQL query sanitations which will prevent hackers from
                      accessing the site using SQL injection. - secured cookies
                      using an app key, each cookie stored in users is encrypted
                      and decrypted using key generated and stored in the app. -
                      CSRF token — This token is generated whenever a user wants
                      to send data to the app if the user doesn&apos;t have this
                      token, he won&apos;t be able to send data to database. And
                      Laravel is an mvc framework which means users or outsiders
                      will not even have direct access to the database to
                      manipulate things. When your bank account information is
                      transmitted via our Services, it will be protected by
                      encryption technology, such as Secure Sockets Layer (SSL).
                      No method of electronic transmission or storage is 100%
                      secure. Therefore, we cannot guarantee absolute security
                      of your Personal Information. You also play a role in
                      protecting your Personal Information. Please safeguard
                      your username and password for your account (MyFund) and
                      do not share them with others. If we receive instructions
                      using your account (MyFund) login information, we will
                      consider that you have authorized the instructions. You
                      agree to notify us immediately of any unauthorized use of
                      your account (MyFund) or any other breach of security. We
                      reserve the right, in our sole discretion, to refuse to
                      provide our Ser
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Protecting Children&apos;s Privacy
                    </p>
                    <p className="text-sm">
                      Our Services are not directed, or intended to be
                      attractive, to children under the age of 18. We do not
                      knowingly collect Personal Information from children under
                      the age of 18. If you are under the age of 18, do not use
                      our Services or submit any information to us.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Links to Third-Party Websites
                    </p>
                    <p className="text-sm">
                      When you use our Services, you may be directed to other
                      websites that are beyond our control. We may also allow
                      third-party websites or applications to link to our
                      Services. We are not responsible for the privacy practices
                      of any third parties or the content of linked websites,
                      but we do encourage you to read the applicable privacy
                      policies and terms and conditions of such parties and
                      websites. This Privacy Policy only applies to our
                      Services.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-y-3">
                    <p className="text-sm font-bold uppercase font-product-sans">
                      Changes to our Privacy Policy
                    </p>
                    <p className="text-sm">
                      Subject to applicable law, we may revise this Privacy
                      Policy at any time and in our sole discretion. When we
                      revise this Privacy Policy, we will post the revised
                      version via our Services and will update the date at the
                      top of this Privacy Policy. The revised Privacy Policy
                      will be effective upon posting via our Services, unless
                      otherwise set forth therein or as otherwise required by
                      applicable law. You are free to decide whether or not to
                      accept a revised version of this Privacy Policy, but
                      accepting this Privacy Policy, as revised, is required for
                      you to continue accessing or using our Services. If you do
                      not agree to the terms of this Privacy Policy or any
                      revised version of this Privacy Policy, your sole recourse
                      is to terminate your access and use of our Services.
                      Except as otherwise expressly stated by us, your access
                      and use of our Services is subject to the version of this
                      Privacy Policy in effect at the time of access or use.
                    </p>
                  </div>
                </div>
                <div className="min-h-[1px] min-w-full bg-[#e2e2e2]"></div>
                <p className="text-sm">
                  If you have any questions, comments, or concerns regarding
                  these Terms or the Services, please contact us
                  at contact@myfundmobile.com, 0808 394 2528
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyAndPolicyPage;
