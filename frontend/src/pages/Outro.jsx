import React, { useContext, useMemo, useRef, useState } from "react";
import agreement from "../assets/images/outro-icons/ESP.png";
import application from "../assets/images/outro-icons/settlement-portal.png";
import refer from "../assets/images/outro-icons/referal.png";
import callForwarding from "../assets/images/outro-icons/call-forward.png";
import stack from "../assets/images/outro-icons/case-study.png";
import { FaRupeeSign, FaTimes } from "react-icons/fa";
import importantPoints from "../assets/data/importantpoints";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { IoIosWarning } from "react-icons/io";
import congratspoints from "../assets/data/congratspoints";
import confetti from "../assets/images/confetti.png";
import Introduction from "../components/Introduction";

const Outro = () => {
  const { url, user } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const agreementChecked = useRef(null);
  const importantChecked = useRef(null);
  const [agreementModal, setAgreementModal] = useState(false);
  const [importantModal, setImportantModal] = useState(false);
  const [congratsModal, setCongratsModal] = useState(false);
  //
  const showImportantModal = () => {
    if (agreementChecked.current.checked === true) {
      setMessage("");
      setAgreementModal(false);
      setImportantModal(true);
      setCongratsModal(false);
    } else {
      setMessage("Please agree to our terms and conditions");
    }
  };
  const showCongratsModal = () => {
    if (importantChecked.current.checked === true) {
      setMessage("");
      setAgreementModal(false);
      setImportantModal(false);
      setCongratsModal(true);
    } else {
      setMessage("Please agree to above text.");
    }
  };
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  //
  const payment = async () => {
    try {
      const data = {
        name: user.name,
        amount: 1,
        mobile: user.mobile,
        merchantUserID: `MUID${Date.now()}`,
        merchantTransactionID: `T${Date.now()}`,
      };
      const res = await axios.post(`${url}/payment`, data);
      if (res.data.success === true) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container full-height-container p-2">
      <div>
        <Introduction
          content={"We offer the following for you to become debt free."}
        />
      </div>
      <hr />
      <div>
        <div className="my-2">
          <div className="outro-grid">
            <div className="outro-div1 outro-flex">
              <div className="outro-image">
                <img src={agreement} alt="" />
              </div>
              <div>
                <p className="fw-bold">EMI Settlement Plan (ESP)</p>
                <p>To settle your enrolled debts</p>
              </div>
            </div>
            <div className="outro-div4 outro-flex">
              <div className="outro-image">
                <img src={stack} alt="" />
              </div>
              <div>
                <p className="fw-bold">Our Fees</p>
                <p>
                  We only charge 10% settlement fee when the enrolled debts are
                  settled.
                </p>
              </div>
            </div>
            <div className="outro-div2 outro-flex">
              <div className="outro-image">
                <img src={application} alt="" />
              </div>
              <div>
                <p className="fw-bold">
                  Mobile User Application & Settlement Portal
                </p>{" "}
                <p>
                  To make our services more accessible and to keep you updated
                  with settlement offers.
                </p>
              </div>
            </div>
            <div className="outro-div4 outro-flex">
              <div className="outro-image">
                <img src={callForwarding} alt="" />
              </div>
              <div>
                <p className="fw-bold">Creditor's Call Diversion Service</p>
                <p>
                  To keep you free from creditor's calls, which we will take on
                  your behalf.
                </p>
              </div>
            </div>
            <div className="outro-div4 outro-flex">
              <div className="outro-image">
                <img src={callForwarding} alt="" />
              </div>
              <div>
                <p className="fw-bold">In-House Legal Advocates</p>
                <p>
                  To protect you from harassment and protect your legal rights.
                </p>
              </div>
            </div>
            <div className="outro-div3 outro-flex">
              <div className="outro-image">
                <img src={refer} alt="" />
              </div>
              <div>
                <p className="fw-bold">
                  Referral Program for enrolled customers
                </p>
                <p>You earn when you refer new customers to us.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end">
          <button className="button" onClick={() => setAgreementModal(true)}>
            Proceed
          </button>
        </div>
      </div>

      {/*  */}
      <div className={`modal-background ${agreementModal ? "active" : ""}`}>
        <div className="modal-container agreement-modal">
          <h2 className="text-center my-2">Your agreement</h2>
          {/*  */}
          <div className="agreement-scrollable">
            <p className="text-uppercase fw-bold">
              TERMS AND CONDITIONS OF BUSINESS Of YES LOANS PRIVATE LIMITED
              TRADING AS SETTLE MY LOAN.
            </p>
            <p>Definition of terms used hereunder:</p>

            <div></div>
            <p>
              “Agreement” means the agreement between you and us made mainly on
              these terms and conditions of business.
            </p>
            <p>
              “Advocate and Lawyers” means empanel Advocates and Lawyers who are
              independent entities that work for Yes Loans Pvt. Ltd.
            </p>
            <p>
              “Breathing Space” means assisting you from Creditor's legal action
              and harassment during the LSS.
            </p>
            <p>
              “Business Day” means a day (other than a public holiday) on which
              banks are open for general business in Mumbai.
            </p>
            <p>
              “Credit Score” means the score which is reflected on the Credit
              Information Report which shall be computed by Credit Information
              companies.
            </p>
            <p>
              “CICRA” shall mean the Credit Information Companies (Regulation)
              Act, 2005 read with the Credit Information Companies Rules, 2006
              and the Credit Information Companies Regulations, 2006, and shall
              include any other rules and regulations prescribed thereunder.
            </p>
            <p>
              “Credit Information Report” means the credit information / scores/
              aggregates / variables / inferences or reports which shall be
              generated by Credit Information Companies;
            </p>
            <p>
              “Creditors” means all your unsecured creditors whose details you
              will provide to us in accordance with your list of Enrolled Debts.
            </p>
            <p>
              “Enrolled Debts” means the unsecured debts that you have indicated
              / informed to us for providing settlement.
            </p>
            <p>
              “Fees” means the Settlement fees & Subscription fees, that we will
              charge you for settlement services for your debts from the amount
              you have paid to us to immediately undertake your settlement. (as
              more particularly described in clause 14)
            </p>
            <p>
              “Subscription fees” refer to the amount you pay on a monthly basis
              for keeping your services active as outlined in the terms and
              conditions.
            </p>
            <p>
              “Settlement fees” refer to the aggregate amount charged to the
              client for a settlement service, encompassing all applicable
              charges, including but not limited to base fees, taxes,
              surcharges, and any additional costs incurred as part of the
              provision of the service or fulfillment of the settlement.
            </p>
            <p>
              “Letter Of Authority” means authority given by you to act &
              negotiate on your behalf under LSS.
            </p>
            <p>
              “Loan Settlement Service (LSS)” means SML will provide you with
              settlement negotiation services based on availability of funds to
              pay your creditors.
            </p>
            <p>
              Lock in period - Lock In period means a period during which no
              party is allowed to exit / terminate or withdraw the contract
              executed between each other. And defaulting party is liable for
              penalty as agreed.
            </p>
            <p>
              “Period” means the agreed period during which your “Loan
              Settlement Services” (LSS) will be activated.
            </p>
            <p>
              “Payment Schedule” is the schedule of the agreed monthly payments
              that needs to be paid into the LSS.
            </p>
            <p>
              “Settle My Loan (SML)” Is the trading name of Yes Loans Pvt. Ltd.,
              under which the settlement service is provided.
            </p>
            <p>
              “Services” means the services we agree to provide you with under
              this Agreement.
            </p>
            <p>
              “SML Client Account (SCA)” is the name for the Special Purpose
              Account for the operation of LSS.
            </p>
            <p>
              “Types Of Settlement” means the different types of settlement that
              SML can negotiate with the Creditors and they are One Time
              Settlement (OTS), Term Settlement also known as On Going
              Settlement (OGS), OTS & OGS with Credit Clearance, Moratorium
              Settlement, and Reversal Settlement.
            </p>
            <p>
              “Special Purpose Account” means a Bank account which we will open,
              whereby an entrusted licensed independent third party (Trustee)
              will manage the account. The Trustee holds and regulates payment
              of the funds required for the operation of the LSS. For SML to
              negotiate on your behalf, you must deposit the settlement funds
              and/or adhere to a regular schedule of deposits. These funds will
              be deposited into the Special Purpose Account that SML will
              control via the Trustee. Under all circumstances, SML will have
              custody or control of the funds you have deposited. (in accordance
              with. Clause 13).
            </p>
            <p>
              “Us” and “We” mean Yes Loans Pvt. Ltd. trading as Settle My Loan
              acting under this Agreement.
            </p>
            <p>
              “You” & “I” means you the person - who is enrolled onto LSS and
              your partner where any of the debts are in joint. names{" "}
            </p>
            <p>
              “Term and Conditions of Business” - (T & C) means these terms and
              conditions of business mentioned hereunder.
            </p>
            <p>
              1. INFORMATION COLLECTION, USE, CONFIDENTIALITY, NO-DISCLOSURE AND
              DATA PURGING
            </p>
            <p>
              1. Permission To Share Data: You hereby grant permission to Settle
              My Loan to share information regarding your loan Account and your
              settlement services with any other party including the Creditors
              of your Enrolled Debts, to the extent necessary to facilitate the
              transactions that you authorize on your Account and to provide
              other services with regards to your debts. You also acknowledge
              that sharing information among these parties is essential to the
              administration of your Account and debts. You understand that the
              Agreement provides additional information relating to your privacy
              rights.
            </p>
            <p>
              2. The Parties agree to protect and keep confidential the Credit
              Information both online and offline.
            </p>
            <p>2. APPOINTMENT AND PERIOD</p>
            <p>
              You have voluntarily appointed us and we have agreed to provide
              the Settlement Services as define
            </p>
            <p>
              2.1 This Agreement will commence the date we receive the “Letter
              Of Authority”, the T & C duly signed and your first deposit into
              the Special Purpose Account.
            </p>
            <p>
              2.2 The day we are notified of your first deposit into the Special
              Purpose Account from you may not be the same day you have received
              the T & Cs the deposit date will not affect the commencement of
              your plan or your ability to cancel. This Agreement will continue
              for the period unless terminated earlier by you.
            </p>
            <p>3. SERVICES</p>
            <p>
              3.1 The purpose of this Agreement is to allow us to work together
              to negotiate and settle your unsecured debts. SML will negotiate
              with your creditors (the “Creditors”) when you have deposited
              sufficient funds under “Loan Settlement Service” (LSS).
            </p>
            <p>
              3.2 If you do not have sufficient funds, then you can enroll onto
              a settlement services called Loan Settlement Services (LSS). You
              will save sufficient or enroll on to LSS and saved sufficient
              funds. Only thereafter will SML negotiate with your creditors (the
              “Creditors”) once clear sufficient funds are deposited to LSS or
              saved by you.
            </p>
            <p>
              3.3 SML will negotiate settlement with your Creditors and the Type
              of Settlement will depend on your circumstances, and on the
              discretion and policies of the Bank and NBFC.
            </p>
            <p>
              3.4 SML will inform you about suitable settlement offers to pay
              off your unsecured, enrolled debts once obtained by SML, after
              your approval and pay directly to Creditors. SML will be permitted
              by you to speak and negotiate in respect of your debts with the
              Creditors. You are responsible to ensure that all debts included
              in the LSS are unsecured. The only unsecured debts that SML will
              negotiate for settlement are listed under “Enrolled Debts” in your
              letter of engagement.
            </p>
            <p>
              3.5 If you do not have sufficient funds to immediately undertake a
              settlement, then SML provide you with other services to give you
              the time to save sufficient funds (Breathing Space) and protect
              you from Creditors legal action and harassment by paying the
              agreed monthly stipulated fees.
            </p>
            <p>
              3.6 In consultation with you, we will negotiate with your
              creditors to Loan Settlement services (LSS) by which you can pay
              off your creditors through a settlement. The LSS is designed for
              you to make monthly payments into the Special Purpose Account
              which will take account of your Creditors and of our Fees. It will
              not take account of any matters you have not told us about.
            </p>
            <p>
              3.7 We will negotiate with your Creditors and attempt to agree
              settlement terms with them with the intent of eliminating debts to
              an amount that will enable you to pay the reduced balance as full
              settlement of all enrolled debts. This agreement will enable LSS
              to act as and facilitate a meditation platform between you and the
              creditor. You also understand that LSS will never be an agent for
              you within the meaning of principal agent relation and shall not
              be held liable for and on behalf of you as an agent.
            </p>
            <p>4. CUSTOMER COMPLAINTS RESOLUTION</p>
            <p>
              4.1 We take any complaint regarding our practices seriously. Any
              complaints can be sent in writing to the Complaints Officer at
              <span className="fw-bold"> customercare@settlemyloan.in</span> .
              Your complaint will be acknowledged within 07 working days, and a
              response to your complaint will be made within 14 days. If you are
              not happy with the response your complaint will be escalated to
              the compliance officer and all communication regarding the
              complaint will only be in writing. You will receive a copy of our
              Code of Conduct and Complaint procedure. Any Data Access requests
              must be completed on our company access request form and
              accompanied by a fee of 500/- Rupees this request must be made in
              writing only by the data subject.
            </p>
            <p>
              4.2 To protect us against “troll-like” virulent reviews, often
              posted solely for vengeance purposes, and false or misleading,
              inappropriate, or irrelevant reviews. You would need to inform us
              of your dissatisfaction or complaint and give us the opportunity
              to re-address it to both of our satisfaction as above. If we are
              unable to resolve the complaint, arising out of this Agreement
              then this will be resolved by way of procedure provided under the
              Arbitration and Conciliation Act, 1996 (amended till date). The
              Venue and the seat of the Arbitration shall be Mumbai. The
              Arbitration is to be conducted by a sole Arbitrator appointed by
              Yes Loans Pvt. Ltd. Thereafter you will be entitled to post a
              review, prior to this any act / did / conduct on your part will be
              in violation of this provision and would be liable to pay
              liquidated damages and Company's legal fees. We will be at liberty
              to initiate appropriate Civil or Criminal Complaint for the same.
            </p>
            <p>5. CUSTOMER COMPLAINTS RESOLUTION</p>
            <p>
              In respect to any legal matters, our empaneled Lawyers will advise
              you on any legal points in respect to the LSS and legal notices,
              ECS & bounced cheques, Banking nodal officer / Ombudsman,
              mediation & arbitration hearings. If you engage our empaneled
              lawyers to deal with attending any hearings related to reply to
              your legal notices, bounced cheque, filing complaint with Banking
              nodal officer / Ombudsman, mediation, attending arbitration & any
              other litigation than the Advocate or Lawyer will inform you of
              their charges in handling that particular matter.
            </p>
            <p>6. YOUR RESPONSIBILITIES.</p>
            <p>
              6.1 You must meet the criteria of the SML, LSSs. SML will rely on
              the accuracy and truthfulness of all information provided by you.
              You will be responsible to comply with the following items.
            </p>

            <p>
              6.2 You will sign any necessary forms of authority i.e. Letter of
              Authority (LOA) or any other documents so that we may negotiate
              and make payments to your Creditors on your behalf:
            </p>
            <p>
              a. You shall provide complete and accurate information related to
              the debts to SML in writing,
            </p>
            <p>
              b. You agree to provide the name, address, telephone number, Email
              address and last loan statement from each Creditor to SML along
              with all other information SML deems necessary to assist it in
              negotiating proper resolution of each Debt.
            </p>
            <p>
              c. You to promptly provide/ communicate any change in financial
              position, debt, or any other information which could affect the
              outcome of debt settlement policy.
            </p>
            <p>d. You shall disclose any pending court cases and litigation.</p>
            <p>
              e. You will fill out and promptly return any papers and
              questionnaires supplied and/or requested by SML.
            </p>
            <p>
              f. You shall consider SML's recommendations regarding any
              potential settlements.
            </p>
            <p>
              g. You will alert SML of any material changes to your financial
              status.
            </p>
            <p>
              h. You shall pay into the Special Purpose Account which will be
              set up by us for Settlement funds for SML's settlement
              negotiations and for payment of settlement amounts to creditors
              and LSS fees.
            </p>
            <p>
              i. Furthermore, you agree to comply with every settlement offer
              secured by the SML and expressly authorizes SML to transfer the
              funds to the Creditor from the Special Purpose Account balance.
              You also agree and authorizes SML to make timely payments to the
              creditors in accordance with negotiated settlements;
            </p>
            <p>
              j. You shall timely pay SML for its fees as described herein and
              acknowledges that all fees are considered “earned” by SML when
              paid for services including but not limited to, Account Setup,
              Analysis of Debts for Enrolment, Processing, Review of Documents,
              Marketing, Client Acquisition, Operational Costs, Negotiations,
              Enrolment costs, Legal and Creditor's call diversion services.
            </p>
            <p>7. YOUR RESPONSIBILITIES.</p>
            <p>
              7.1 SML will open the Special Purpose Account with its banker, for
              the purpose for you to deposit funds for settlement (LSS) or save
              funds for SML's settlement negotiations and for payment of
              settlement amounts to creditors and LSS fees.
            </p>

            <p>
              7.2 SML shall hold your personal information in the strictest
              confidence, except as is necessary during SML performance of this
              Agreement.
            </p>
            <p>
              7.3 Specifically, and among other reasons, you authorizes SML to:
            </p>
            <p>
              (a) disclose to any of the Creditors any information concerning
              your financial condition and status including, but not limited to,
              income, debts, credits, earnings, and/or location information; and
            </p>
            <p>
              (b) obtain necessary financial information concerning you from any
              of the Creditors. SML will perform the duties described in this
              Agreement, will keep you reasonably informed of progress in the
              pursuit of the Agreement's objectives, and will respond promptly
              to your inquiries and communications.
            </p>

            <p>
              7.4 SML may, at its sole discretion, transfer part or all your
              information to independent support service providers specifically
              to provide account support, settlement processing, legal and
              customer service features for your benefit. SML may, at its
              option, change support service processors from time to time. You
              agree to cooperate and work with any designated support services.
            </p>
            <p>
              7.5 SML to disclose every possible outcome of the debt settlement
              policy and to disclose every risk involved in the debt settlement
              policy. Both the parties understand and agree to provide the
              complete and accurate information to each other.
            </p>
            <p>8. EFFECTS OF SETTLEMENTS</p>
            <p>
              8.1 SML does not provide any credit repair or correction services
              whatsoever, you understand that if you do not make regular
              payments to creditors or if creditors are unwilling to accept a
              settlement, added interest, late fees, delinquencies, collection
              efforts, and legal action could result. Such may also result in a
              substantial reduction in your credit score and negative credit
              report.
            </p>
            <p>
              8.2 If you have chosen not to remain current on your payment
              obligations, you may lose important benefits of credit, including
              loans or refinances, or have existing credit revoked and could
              also impact your borrowings in the future.
            </p>
            <p>
              8.3 You also understand that you should not have any account with
              the bank / NBFC / lender where you have taken any debts to be
              repaid. In such a situation, the lender may take funds from your
              other accounts to pay your obligations. After complete awareness
              and consideration of all these possibilities, you still wish to
              proceed with the terms and conditions of this Agreement.
            </p>
            <p>
              8.4 You understand and agree that in the event of non-compliance
              with LSS and the obligations assigned, we have the right to
              terminate the agreement immediately and to initiate legal action
              for recovering settlement fees or legal charges (if any).
            </p>
            <p>9. STANDARD DISCLOSURE STATEMENT</p>
            <p>
              Yes Loans Pvt. Ltd., trading as Settle my loan (SML) provides a
              method of debt resolution known as debt settlement. The following
              disclosures are to make consumers aware of the advantages and
              disadvantages of a debt settlement.
            </p>
            <p>By Initializing each item below, you understand:</p>
            <p>
              9.1 You are enrolling into a debt settlement services after
              voluntarily seeking assistance from SML. The goal you have set is
              to develop a plan or to negotiate mutually agreeable settlements
              between you and your creditor(s) for payment of certain unsecured
              debt(s) described as enrolled Debts. While no specific results can
              be predicted or guaranteed; SML specializes in the process of
              negotiations and settlement and will work to the fullest to
              realize your goals.
            </p>
            <p>
              9.2 In entering into this Agreement, you acknowledge that SML will
              be undertaking any action solely in its capacity as your Non-
              exclusive Agent pursuant to the terms of this Agreement and the
              Letter of Authority that you have signed. You acknowledge that SML
              has not advised you to reduce or terminate payments to your
              creditors and you have been advised that SML will not take any
              action that might be construed as interfering with the contractual
              relationships between you and your creditors.
            </p>
            <p>
              9.3 In entering into this Agreement, you represent that no
              enrolled creditor accounts are secured by collateral or cross
              collateralized with another account or property. Secured debt is
              debt for which the creditor has collateral in the form of a
              security interest in personal and/ or real property. Should you
              fail to make timely payments on a secured debt, the creditor is
              entitled to repossess the property and sell it.
              Cross-collateralized debt exists where security has been mortgaged
              and pledged to a creditor under a document that provides that the
              collateral not only secures primary obligations such as a property
              or a car, but also other debt that may include enrolled debt. A
              creditor may also have the right to offset your enrolled
              obligations against bank or other accounts maintained by that
              creditor in your name.
            </p>
            <p>
              9.4 Most creditors and collectors are likely to negotiate with
              SML, but SML cannot force the negotiations and cannot force
              creditors to accept a settlement. Your creditors are likely to
              continue collection efforts on delinquent accounts while you are
              enrolled on LSS. SML makes no claim that we will be able to stop
              these collection activities but will continue to negotiate these
              accounts throughout the process. In many cases creditors and
              collectors will negotiate on payment and /or debt settlement even
              if a lawsuit has been filed.
            </p>
            <p>
              9.5 Your LSS assumes an effort that will continue for many months.
              The time needed to produce a settlement depends on a number of
              factor These may include:
            </p>
            <p>a. The financial hardship,</p>
            <p>
              b. the age and balance of the accounts that you owe your
              creditors,
            </p>
            <p>c.the funds you have available to pay for a settlement and</p>
            <p>
              d. the willingness of individual creditors to enter into debt
              settlement negotiations. While no guarantees can be given,
              generally the quicker you save money the sooner you will be able
              to reach your goals. However, each settlement must be acceptable
              to both you and your settling creditor.
            </p>
            <p>
              9.6 Since you have voluntarily decided to not make required
              minimum payments to your creditors you may be breaking the terms
              of your agreements with them. It is likely your actions will be
              reported to credit reference agencies (credit bureaus) as late,
              delinquent, charged-off or past due balances. Your creditor may
              also raise the interest rate on your account and impose other
              penalties. Your account balance will continue to grow as your
              creditor adds accrued interest, late fees, over-limit fees and
              penalties. After Settlement your creditors are obligated to
              properly report the status and outcome of the closed and settled
              account. It is the creditors' responsibility to properly report
              these items to the credit bureaus. LSS may have an adverse effect
              on your credit report and credit score depending on your specific
              situation.
            </p>
            <p>
              9.7 The settlement services that we have committed to reach your
              debt settlement goal is detailed in your Letter of Engagement.
              Those summaries reflect the projected amount that we have
              estimated you will need to save to put yourself in a position to
              reach your goals. Actual settlement amounts, necessary settlement
              funds and the period required to reach your goal may vary based on
              creditor actions and other factors that cannot be considered at
              this time.
            </p>
            <p>
              9.8 Communications with creditors are handled on a case-by-case
              basis. In some instances, creditors will be notified immediately
              of your enrolment. In other instances, SML determines that
              Settlement negotiations should not begin until several months
              after you enrolled on LSS.
            </p>
            <p>
              9.9 To summarize, each case is unique, and results may vary. LSS
              can be a very effective way to resolve your debt, but it is not a
              painless process, and no guarantees can be given because the
              process is subject to factors that neither you nor SML may be able
              to control. As with any type of debt settlement, failure to
              complete a LSS is likely to have negative consequences on your
              financial situation.
            </p>
            <p>10. WHAT IS NOT INCLUDED IN THIS AGREEMENT</p>
            <p>
              10.1 You expressly acknowledge that SML do not provide any kind of
              tax and/or investment advice whatsoever. However, any legal
              service will be provided by SML panel of Advocates, who are
              independent entities.
            </p>
            <p>
              10.2 This Agreement only covers the Debts/Creditors listed in
              “Enrolled Debts” and only unsecured Debts owed to the Creditors as
              of the date of this Agreement. Should you desire SML to assist in
              resolving additional debts or debts arising after the date of this
              Agreement, you must enter into a separate Agreement, and
              resolution of such additional debts would be subject to the terms
              of that separate Agreement. You acknowledge and understands that
              SML does not provide legal advice. Legal advice or representation
              must only be provided by an attorney at law from the panel of
              Advocates of SML. You understand and agrees that SML has not
              represented that it will advise or assist you in the modification,
              improvement or correction of any credit entries contained your
              credit reports, nor that SML can stop all collection phone calls
              or correspondence.
            </p>
            <p>
              10.3 You agree that SML does not claim to be able to improve your
              credit rating or credit report, nor remove any credit reference on
              your credit report and that SML has no responsibility or
              obligation for any past, present or future credit rating assigned
              by any of the Creditors or for any information contained in any
              credit reporting service.
            </p>
            <p>11. TERMINATION & LOCK-IN PERIOD</p>
            <p>
              11.1 If you want to terminate / withdraw the contract within 6
              months any time from the date of enrolment, you are liable to pay
              total settlement charges at a time along with legal fees or any
              other charges which you are liable to pay to us (if any) till the
              date of termination is accepted.
            </p>
            <p>
              11.2 If you wish to terminate the contract after expiry of lock-in
              period of 6 months, you are liable to give 30 days' notice in
              writing to us. You must send an email on{" "}
              <span className="fw-bold">customercare@settlemyloan.in</span> to
              intimate your request for termination. Please note that this
              termination will be subject to evaluation and we will be entitled
              to deduct our fees for debt settlement services, our subscription
              charges, legal fees or any other charges under settlement
              services.
            </p>
            <p>Effects after termination of contract:</p>
            <p>
              - You shall not be eligible for any assistance from SML in any
              manner.
            </p>
            <p>- You shall settle all outstanding fees due with SML.</p>
            <p>
              - You shall keep SML indemnified against all claims and losses.
            </p>

            {/* New Refund Policy Section */}
            <p>12. REFUND POLICY</p>
            <p>
              If you opt to refund after completion of the lock-in period you
              need to communicate your intention of doing so in writing by
              emailing us at{" "}
              <span className="fw-bold">customercare@settlemyloan.in</span>. We
              further state that we will deduct 7.5% of your total loan
              outstanding, account maintenance fees, and legal fees, and
              thereafter refund the balance amount (if any). For any questions
              or requests related to refunds, you need to contact SML at{" "}
              <span className="fw-bold">customercare@settlemyloan.in</span>.
              This policy is designed to be fair and transparent, reflecting our
              commitment to client satisfaction and trust.
            </p>

            {/* New Special Purpose Account Section */}
            <p>13. SPECIAL PURPOSE ACCOUNT</p>
            <p>
              13.1 You agree that the Special Purpose Account will be opened by
              SML for you, and it will be called the Special Purpose Account
              (SPA).
            </p>
            <p>
              13.2 The Special Purpose Account which we will open for you
              whereby an entrusted licensed independent third party
              (Trustee),will manage the operation of the Special Purpose
              Account. The Trustee holds and regulates payment of the funds
              required for the operation of the LSS. For SML to negotiate on
              your behalf, you must adhere to a regular schedule of deposits.
              These funds will be deposited into the Special Purpose Account of
              which only we will have control via the Trustee
            </p>
            <p>
              13.3 You understand that the Special Purpose Account is governed
              by the terms of this Agreement and the participating Banks, Trust
              terms of services, disclaimer, and privacy policy of the said
              Bank, and that you are bound by all of its terms and conditions.
            </p>
            <p>
              13.4 You understand that the Special Purpose Account when
              established in accordance with this Agreement, that only you (or
              SML, or your authorized contact, if any) via the Trustee may
              authorize deposits to and payments from the Special Purpose
              Account.
            </p>
            <p>13.5 You hereby authorize:</p>
            <p>
              - That you will periodically make deposits to the Special Purpose
              Account pursuant to the authorization provided below, and
            </p>
            <p>
              - Periodic disbursements to be made from the Special Purpose
              Account. In this regard, you hereby authorize payment from the
              Special Purpose Account of the fees and charges provided for in
              this Agreement.
            </p>
            <p>
              13.6 Should you designate an authorized contact, such designation
              allows for confirmation of the Special Purpose Account information
              and for receipt of messages regarding the Special Purpose Account
              to the designee.
            </p>

            {/* New Fees Section */}
            <p>14 FEES</p>
            <p>
              14.1 Settlement Fee: From your monthly payment, we shall deduct a
              monthly subscription fee for each month of service, along with a
              one-time charge of 7.5% of your total outstanding (O/S) amount at
              the time of settlement. Please note that you are obligated to pay
              any applicable government taxes, which will be deducted from your
              monthly payment. In the event of notices requiring responses, a
              subsidized rate of Rs. 499 shall be charged, or you may opt to pay
              such fees directly. These terms constitute a binding agreement and
              the user, governing the provision of services and the associated
              financial obligations. Failure to remit the subscription fees and
              notice response charges may result in deductions from the funds
              held on behalf of the user. Such deductions will be made without
              prior notice, and the user hereby consents to such deductions as a
              means of settling outstanding financial obligations. We reserve
              the right to take appropriate legal action to recover any
              outstanding amounts owed.
            </p>
            <p>
              14.2 Service Fee Breakdown: Our fees cover a range of services
              including, but not limited to:
            </p>
            <p>- Special Purpose Account setup</p>
            <p>- Trustee fees</p>
            <p>- Debt analysis for enrolment</p>
            <p>- Document processing and review</p>
            <p>- Marketing and client acquisition</p>
            <p>- Operational costs</p>
            <p>- Negotiations</p>
            <p>- Enrolment costs</p>
            <p>- Creditor's call diversion services</p>
            <p>
              Fees to be paid under Loan Settlement Services (LSS) will be
              determined on an individual basis and will be clearly outlined in
              your payment schedule.
            </p>
            <p>
              14.3 Fee Allocation: Fees paid to SML compensate us for our
              services. They are non-refundable, except in cases where they are
              not deemed earned as specified in this Agreement. It is important
              to note that these fees are not set aside in the Special Purpose
              Account for debt settlements. Any fees paid to us are exclusively
              for our services and are not used to pay creditors.
            </p>
            <p>
              14.4 Legal Fees: We will charge a fee for replying to legal
              Notices at a nominal fee of ₹499/- per notice reply inclusive of
              GST and ₹3,540/- per hearing for attending arbitration and Court
              hearing / dates. If you don't pay the said legal fees separately,
              the amount will be deducted from your monthly fees paid to us in
              the current and/or subsequent month. Kindly note that if you fail
              to make the payment of legal charges within 3 days from the date
              of acknowledgment of your email, we will deduct the same from your
              settlement funds.
            </p>
            <p>
              14.5 You have agreed that after signing the Agreement,
              Settlemyloan will attempt to effectuate such settlement for all
              enrolled accounts, and that in the event that you receive an offer
              directly from your enrolled creditors—whether or not Settlemyloan
              is aware of it—such an offer will be deemed to be the result of
              those efforts. With or without your permission, all fees that are
              accrued may be taken out of the Special Purpose Account settlement
              fund.
            </p>

            <p>
              I understands that all the fee calculations mentioned in this
              Agreement and in other documents are only estimates calculated by
              using the amount of the Enrolled Debts. The Monthly Subscription
              Fees is applicable throughout the tenure of the settlement
              services, in the case of extension of the settlement beyond the
              tenure, the Monthly Subscription Fees shall increase in equal
              proportion.
            </p>
            {/* New Penalty for Irregular Monthly Payment Section */}
            <p>15. PENALTY FOR IRREGULAR MONTHLY PAYMENT</p>
            <p>
              15.1 In the event that if you failed to make the agreed stipulated
              monthly payments for any particular month, but you want to keep
              your services active, you are liable to pay a monthly penalty of
              Rs. 5,000/- (Rupees Five Thousand Only) over and above the amount
              paid or to be paid to us. This penalty is collected only to
              maintain your active status for your settlement services and you
              will be still liable to pay the monthly stipulated payments as
              agreed.
            </p>
            <p>
              15.2 The penalty to be paid in 2.1 above of Rs. 5,000/- (Rupees
              Five Thousand Only) excludes any money paid towards debt
              settlement, our subscription charges, legal fees or any other
              charges during settlement services.
            </p>

            {/* General Terms and Conditions Section */}
            <p>16. GENERAL TERMS AND CONDITIONS</p>
            <p>
              16.1 This Agreement sets out the entire understanding between the
              parties and supersedes all prior agreements, understandings, or
              arrangements (whether oral or written) relating to the provision
              of the Services.
            </p>
            <p>
              16.2 You acknowledge that you have entered into this Agreement in
              reliance only on the representations, warranties, and promises
              specifically contained or incorporated in the agreement and except
              as expressly set out in this Agreement and that we shall bear no
              liability in respect of any representation, warranty, or promise
              made prior to the start of this Agreement unless it was made
              fraudulently.
            </p>
            <p>
              16.3 We shall not be deemed to be in breach of this Agreement or
              otherwise liable to you if we are prevented from performing our
              obligations under this Agreement by reason of any event beyond our
              reasonable control.
            </p>
            <p>
              16.4 The Governing Law of this Agreement shall be the Substantive
              law of India.
            </p>
            <p>
              16.5 You also represent that you have signed the present agreement
              out of your own free will and consent without any undue influence
              or pressure from any side.
            </p>

            {/* New Dispute Resolution Section */}
            <p>17. DISPUTE RESOLUTION</p>
            <p>
              Any dispute or difference whatsoever arising between the parties
              out of or relating to the construction, meaning, scope, operation,
              or effect of this contract or the validity or the breach thereof
              shall be settled by arbitration in accordance with the Rules of
              Arbitration of the Indian Council of Arbitration and the award
              made in pursuance thereof shall be binding on the parties.
            </p>

            {/* New Force Majeure Section */}
            <p>18. FORCE MAJEURE</p>
            <p>
              In the event either party is unable to perform its obligations
              under the terms of this Agreement because of acts of God, strikes,
              equipment or transmission failure or damage reasonably beyond its
              control, or other causes reasonably beyond its control, such party
              shall not be liable for damages to the other for any damages
              resulting from such failure to perform or otherwise from such
              causes.
            </p>

            {/* New Limitation of Liability Section */}
            <p>19. LIMITATION OF LIABILITY</p>
            <p>
              Notwithstanding anything else contained in this Agreement, the
              Client agrees and acknowledges that SML's liability arising from
              this Agreement, whether in contract or tort, will not exceed the
              aggregate amount of Fees and other charges paid or payable by the
              Client to the SML under this Agreement.
            </p>

            {/* New Amendments and Voluntary Changes Section */}
            <p>20. AMENDMENTS AND VOLUNTARY CHANGES</p>
            <p>
              SML reserves the right to voluntarily make changes to the Terms
              and Conditions (T&C) as necessary.
            </p>
          </div>

          {/* Confirmation Section */}
          <label htmlFor="agreement" className="label-flex mt-2">
            <input
              type="checkbox"
              name="agreement"
              id="agreement"
              ref={agreementChecked}
            />
            Click here to confirm to the terms & conditions
          </label>
          <p className="text-danger text-end">{message}</p>
          <div className="d-flex align-items-center justify-content-end gap-2 mt-2">
            <button
              className="red-button"
              onClick={() => setAgreementModal(false)}
            >
              close
            </button>
            <button className="button" onClick={showImportantModal}>
              Agree & proceed
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={`modal-background ${importantModal ? "active" : ""}`}>
        <div className="modal-container">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="label-flex">
              <IoIosWarning className="text-warning fs-3" />
              Important points to note
            </h2>
            <div
              className="close-modal"
              onClick={() => setImportantModal(false)}
            >
              <FaTimes />
            </div>
          </div>
          <hr />
          <div className="my-2">
            {importantPoints.map((item, index) => {
              return (
                <div className="important-flex" key={index}>
                  <p className="circle-list">{index + 1}</p>
                  <p>{item.point}</p>
                </div>
              );
            })}
          </div>
          <div>
            <label className="label-flex">
              <input type="checkbox" ref={importantChecked} />I have read &
              understood the above
            </label>
            <p className="text-danger">{message}</p>
            <button className="button w-100 mt-2" onClick={showCongratsModal}>
              Continue
            </button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className={`modal-background ${congratsModal ? "active" : ""}`}>
        <div className="modal-container">
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-start gap-2">
                <h2>Congratulations</h2>
                <div className="confetti">
                  <img src={confetti} alt="" />
                </div>
              </div>
              <div
                className="close-modal"
                onClick={() => setCongratsModal(false)}
              >
                <FaTimes />
              </div>
            </div>
            <p className="fw-bold">
              Enroll now for only ₹599 to become debt free
            </p>
          </div>

          <div className="mt-2">
            <div className="my-4">
              {congratspoints.map((item, index) => {
                return (
                  <div className="important-flex" key={index}>
                    <p className="circle-list">{index + 1}</p>
                    <p>{item.point}</p>
                  </div>
                );
              })}
            </div>
            <button className="button w-100" id="payment" onClick={payment}>
              <span>Start Now!</span>
              <br />
              <small>
                Pay <FaRupeeSign />
                599
              </small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outro;
