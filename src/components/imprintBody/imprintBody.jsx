import styles from "./imprintBody.module.css";

import { useState } from "react";

const ImprintBody = () => {
  const [active, setActive] = useState(0);

  return (
    <div className={`container ${styles.section}`}>
      <h2>Imprint:</h2>
      <div className={`${styles.body}`}>
        <div className={styles.content}>
          <p>
            Dear lawyers, the website “nefentus.com” does not intend to violate
            the rights of third parties, not even negligent. However, should
            there be problems of any kind, we would like to ask you to contact
            us immediately. If you suspect that this website violates any of
            your intellectual property rights, please notify us immediately by
            email so that remedial action can be taken quickly. Please note: The
            more time-consuming intervention of a lawyer for the fee-based
            warning for the service provider does not correspond to his real or
            presumed will. Establishing contact makes sense on both sides to
            avoid unnecessary litigation and unnecessary costs. We will
            immediately have your objection examined and immediately stop it if
            warranted. Without prior contact, we will reject the cost note of
            your legal efforts and warning in the sense of a duty of mitigation
            on your part as unfounded.
          </p>

          <p>
            Nefentus Solutions LTD <br /> Faneromenis Avenue 85, Ria Court 46,
            Office 301, 6025 Larnaca <br /> Phone: +357 99330721 <br /> Email:
            office@nefentus.com <br /> Internet: www.nefentus.com
          </p>

          <p>
            Managing Director: Steven Maindl <br /> Company number: CY-10403678V
          </p>

          <h4>Terms of use of the website</h4>

          <p>
            When using the website of Nefentus Solutions Limited (hereinafter
            referred to as NEFENTUS), please note the following: NEFENTUS
            reserves the right to change or supplement these terms of use in any
            way. The user should read these notes at the beginning of each visit
            to this website in order to familiarize themselves with possible
            changes. The content of this website is for general informational
            purposes only and is not intended to constitute an offer, advice or
            recommendation to buy or sell investments. This website contains
            general information about NEFENTUS and the nature of the products
            and services offered by NEFENTUS. The website of NEFENTUS is aimed
            at persons who are domiciled in a country that is not prohibited by
            the legal system of their state from accessing this website. Such
            persons are not permitted to access the website of NEFENTUS.
          </p>

          <h4>1. Usage permit</h4>
          <p>
            NEFENTUS grants the user a revocable, non-exclusive,
            non-transferable and limited permission to access and use the
            website and the materials contained on it. The permission is valid
            only insofar as the user exclusively pursues the objectives
            described below and adheres to the restrictions set out in these
            instructions. The user is not permitted to interrupt or attempt to
            operate the website in any way.
          </p>

          <h4>2. Warranty exclusion</h4>
          <p>
            Among other things, this website contains general information about
            the type of products and services offered by NEFENTUS. This website
            is not directed to persons in countries / jurisdictions where the
            publication of information or the distribution of such products and
            services as described on the website is prohibited, whether due to
            nationality, residence or other reasons. Persons subject to such
            restrictions may not use the website in question.
          </p>

          <h4>3. Put links to the website</h4>
          <p>
            A link to this website may only be placed if it refers to the
            homepage www.maindlventures.com (no deeplinks) and if this does not
            confer any rights of NEFENTUS or other companies of NEFENTUS have
            been infringed, in particular copyright, ancillary copyright or
            trademark rights and written permission from NEFENTUS has been
            requested.
          </p>

          <h4>4. Copyrights</h4>
          <p>
            It is possible to download copies of the reports or information
            available on the Site, but these may be used for personal
            non-commercial purposes only, provided that no changes are made to
            the copyright, trademarks or other proprietary notices.
          </p>

          <h4>5. Brands and logos</h4>
          <p>
            The trademarks and logos used on the website are protected. It is
            not permitted to use these trademarks without the prior written
            consent of NEFENTUS.
          </p>

          <h4>6. Disclaimer for the content of the website</h4>
          <p>
            NEFENTUS makes every effort, to the best of its knowledge and
            belief, to ensure the correctness and regular updating of the
            information published / presented on the website. However, NEFENTUS
            assumes no responsibility or guarantee of any kind, either express
            or implied, and disclaims all and any liability for accuracy,
            accuracy, completeness, merchantability, punctuality, fitness or
            correct order for any particular purpose The website and all
            information contained therein (or the results obtained from your use
            or the decisions made in connection therewith). There may be delays,
            omissions and inaccuracies. NEFENTUS may change the content of the
            Website or discontinue the provision of such content at any time.
            Unless otherwise stated, all information and opinions presented on
            the website are solely those of NEFENTUS. Any information provided
            with a date will only be published on the appropriate date. There is
            no obligation to update or supplement such information. The Website
            may contain advice or information from third parties or links to
            them. NEFENTUS assumes no responsibility for the accuracy,
            completeness, timeliness or suitability of such information that is
            not reviewed and updated. The use of this information is at the
            user’s own risk. Website users assume the full risk of accessing or
            using the website. NEFENTUS assumes no liability to the user for any
            direct or indirect damages, including, but not limited to, loss of
            profit, loss of capital or any other single or repeated damages
            arising out of the use or inability to use or access the Website and
            your elements result.
          </p>

          <h4>7. Conflicts of interest</h4>
          <p>
            NEFENTUS, its directors and employees may have or have had their own
            interests in securities or other values directly or indirectly
            referred to on this website. In addition, such persons may maintain
            or maintain relationships with businesses or provide or provide
            services to, or directly to, any of the companies referred to,
            directly or indirectly, on this website.
          </p>

          <h4>Copyright</h4>
          <p>
            This website and related rights to databases, trademarks and other
            intellectual property rights are the property of Nefentus Solution
            Limited. The reproduction, processing, distribution and any kind of
            exploitation of these documents outside the limits of copyright
            require the written consent of the owner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImprintBody;
