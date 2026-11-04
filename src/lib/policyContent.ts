// src/lib/policyContent.ts
// Static for now — this is the exact field shape an ACF wysiwyg editor field will
// return later, so swapping this to a WP fetch means no change to PolicyPage.

export type PolicyContent = {
  title: string;
  html: string;
};

const POLICIES: Record<string, PolicyContent> = {
  "terms-conditions": {
    title: "Terms & Conditions",
    html: `
      <p><strong>ARKequine (www.ark-equine.com)</strong></p>
      <p>How do we protect your information? We implement a variety of security measures to maintain the safety of your personal information when you place an order. All supplied credit information is transmitted via BOI Payment. After a transaction, your private information (credit cards) will not be stored on our servers.</p>
      <p><strong>Your Agreement with Us</strong></p>
      <p>By using www.ark-equine.com, you agree to use it only in a manner that is consistent with the conditions listed and in compliance with all applicable laws and regulations. You may not use www.ark-equine.com for unlawful purposes, infringe upon  www.ark-equine.com or third party rights, restrict or stop third parties from enjoying or using, use the site for obscene, offensive, indecent or threatening purposes.</p>
      <p><strong>Disclaimer</strong></p>
      <p>Price and availability information is subject to change without notice. Except as specifically stated on this website, to the fullest extent permitted at law, neither www.ark-equine.com or any of its affiliates, employees or other representatives will be liable for damages arising out of or in connection with the use of this website. This is a comprehensive limitation of liability that applies to all damages of any kind, including (without limitation) compensatory, direct, indirect or consequential damages, loss of data, income or profit, loss of or damage to property and claims of third parties.</p>
      <p><strong>Copyright</strong></p>
      <p>The user may download or copy materials for personal use only but the copyright therein shall be maintained in Ark-Equine. Links to this site are not permitted (other than to the Home Page), except with prior written consent. This is the same for images.</p>
      <p><strong>Trademarks</strong></p>
      <p>All trademarks on this site such as www.ark-equine.com or others are trademarks of the respective companies and you may not use these marks without express written permission.</p>
      <p><strong>Agreement</strong></p>
      <p>In the event that you do not agree to be bound by these terms and conditions please refrain from using our site or placing orders with www.ark-equine.com . &ldquo;I have read www.ark-equine.com standard terms and conditions of business, its liability disclaimers and its policy in relation to intellectual property, confidentiality and privacy, data protection, links to external websites and general disclaimer and agree to be bound by these provisions in relation to my use of www.ark-equine.com &rdquo;</p>
      <p><strong>Privacy Statement</strong></p>
      <p>ARKequine trading on-line as www.ark-equine.com will not forward or circulate customer information to any other party and will uphold customer confidentiality/privacy at all times. If you require that your personal information be removed from our files, please send us an email.</p>
      <p>At ARKequine, we are committed to protecting the online privacy of visitors to our websites. This Privacy &amp; Cookie Policy explains how ARKequine handles the personal information that you provide to us on websites controlled by ARKequine and which link to this Privacy &amp; Cookie Policy (together referred to as &ldquo;www.ark-equine.com website(s)&rdquo;). This Privacy &amp; Cookie Policy also describes the collection of certain other types of technical and web browsing information through the use of &lsquo;cookies&rsquo; and related technologies on www.ark-equine.com websites.</p>
      <p>Unless otherwise specifically noted, this Privacy &amp; Cookie Policy does not apply to personal information collected from you offline, to ARKequine websites that do not link to this Privacy Policy, to residents of the United States, or to third-party websites to which ARKequine Web Sites may provide a link. Your use of www.ark-equine.com websites is subject to this Privacy &amp; Cookie Policy and the online Terms of Use.</p>
      <p>Please read this Privacy &amp; Cookie Policy before using www.ark-equine.com websites or submitting personal information to us.</p>
      <p><strong>What is &ldquo;personal information&rdquo; as referred to in this Privacy Policy?</strong></p>
      <p>&ldquo;Personal information&rdquo; means information that identifies you, or could be used to identify you, and which is submitted to and/or collected by www.ark-equine.com. Examples of personal information include your name, your postal address, your e-mail address and your telephone number. Such information is only collected from you if you voluntarily submit it to ARKequine.</p>
      <p><strong>How does ARKequine collect information online?</strong></p>
      <p>www.ark-equine.com collects information in two ways:</p>
      <p>Personal Information voluntarily submitted by you:<br>ARKequine collects personal information that you enter into data forms on www.ark-equine.com websites. For example, you may submit your name, postal address, e-mail address, and/or other information in order to receive information about various products, topics or promotions, register for ARKequine services, contact ARKequine customer service, or participate in ARKequine surveys. If you choose to provide personal information through our websites, we will collect and retain that information in an accessible form. To protect your privacy, you should not provide ARKequine with any personal information that is not specifically requested.</p>
      <p>Passive Collection of Non-Personal Information &amp; use of &lsquo;Cookies&rsquo;:<br>www.ark-equine.com websites log certain non-personal &lsquo;technical&rsquo; information about your visits to www.ark-equine.com websites without you actively submitting such information. Information logged is confined to the following items:</p>
      <p>the visitors IP address<br>the type of web browser and operating system used by the website visitor<br>the ISP used by the visitor<br>the top-level domain name used (e.g. .ie, .com, .org, .net)<br>the URL of the previous website from which you accessed the Ark-Equine website, including any search terms used<br>This information is collected using various technologies, such as &lsquo;cookies&rsquo;, and &lsquo;web beacons&rsquo;.</p>
      <p>Cookies are small data files that are automatically sent from a web server to your browser and stored on your computer. Cookies can only be read by the server that sent it to your web browser. Web beacons (also referred to as GIF files, pixels or Internet tags) may be used by web servers to identify a unique cookie on your browser, recognise you as a previous visitor to our website, and collect anonymous information about your visit.</p>
      <p><strong>ARKEQUINE WHOLESALE AGREEMENT</strong></p>
      <p>The applicant(s) apply to ARKEquine for trade on the terms and conditions set out below. All goods are sold by ARKEquine (the &ldquo;Supplier&rdquo;) to the person on whose behalf this application is made (the &ldquo;Customer&rdquo;) subject to the following terms and conditions (&ldquo;Trading Terms&rdquo;).</p>
      <p>Supplier company details:</p>
      <p>ARKEquine</p>
      <p>Head Office: ARK Equine,<br>Newbridge Industrial Estate,<br>Newbridge,Co. Kildare,<br>W12 YF63, Ireland.</p>
      <p>info@arkequine.ie</p>
      <p><strong>GENERAL</strong></p>
      <p>The customer warrants that all information given to us is true and correct.</p>
      <p>The customer agrees to notify the supplier within seven (7) days of any change affecting legal entity, structure, management of control.<br>The signatory warrants that where there is more than one applicant, or the applicant is a corporation that he or she is authorized to sign on behalf of all applicants or the corporation as appropriate.<br>The customer understands that the supplier may change this agreement at any time and that the latest version of this agreement can be found on our website.</p>
      <p><strong>ORDERING</strong></p>
      <p>Each order is subject to acceptance by the Supplier and may be accepted in whole or in part and may be declined.<br>All trading between Supplier and Customer shall be on these trading terms. An order will only be accepted on these services to Customer or its agent shall constitute an offer by Supplier to supply the goods subject to these Trading Terms, which offer Customer may accept by submitting an order of the goods.<br>Orders may be placed via the online ordering system, via email at info@arkequine.ie, or via phone.</p>
      <p><strong>PRICING</strong></p>
      <p>The prices charged (unless a prior written quote is given) shall be those prices prescribed by the supplier at the date of ordering.<br>Recommended resale or retail prices appearing in any price list or publication are recommended prices only and there is no obligation on the customer to comply with such recommendations.<br>The goods are subject to availability and prices may change without prior notice. The prices of goods at the time the date of ordering will be the final price.<br>Pricing information will be made available to the customer by the supplier via the website via their logged in account.<br>Discounted pricing given to the customer will only be given once a minimum order value of 500 has been reached (excluding shipping and taxes) for each order of goods. The supplier may also apply other minimums such as minimum quantities on specific products and/or minimum order quantities at its discretion. The supplier will make these minimums obvious prior to submission of the order.</p>
      <p><strong>PAYMENT TERMS</strong></p>
      <p>Payment for goods is required on a payment before delivery basis. All payments are to be prepaid and made in full and without any deductions.<br>Payment may be accepted via online payment via the website using credit card, cheque, or bank transfer. Invoices with NET terms may be requested by the customer but will not be guaranteed and is at the discretion of the supplier.<br>Supplier may at any time alter, suspend or refuse delivery or cancel unfulfilled orders and refuse payment by cheque when in its opinion (reasonable or otherwise) of the financial condition of the customer warrants it.</p>
      <p><strong>SHIPPING/HANDLING</strong></p>
      <p>Delivery dates or times indicated by the supplier are approximate only and are not a guarantee of delivery by such date or at all. If an order covers a number of items, the supplier may make part deliveries in respect of all or any such goods, in which event the normal terms of payment shall apply to the goods so delivered and no claim shall arise in respect of the shortfall.<br>Goods placed on back order shall be supplied immediately as they are available unless prior written advice of cancellation is received from the customer.<br>The Goods will be delivered by the supplier&rsquo;s logistic and delivery services to the shipping address specified by the customer. The customer will inspect the goods and report any defects, visible damages, or noncompliance to the supplier within three (3) business days upon receipt of goods.</p>
      <p><strong>WARRANTIES</strong></p>
      <p>The Client purchases the goods &ldquo;as is&rdquo; and the supplier disclaims any representation and warranty regarding the sale of goods and the shipping of the merchandise except for the expiration date of the goods.</p>
      <p><strong>CANCELLATIONS</strong></p>
      <p>Customer may cancel the order up to five (5) days prior to the delivery date indicated by the supplier. Any cancellations after the allowable period will result in a 50% refund on the total payment made.</p>
      <p><strong>DEFECTS/RETURNS</strong></p>
      <p>Supplier agrees to meet our obligations under the laws of the supplier&rsquo;s headquarters location in respect to defects and returns of purchased goods.<br>Supplier may choose to charge a restocking fee of 15% to goods returned.<br>Customer will be responsible for shipping and handling charges to return any unwanted items.</p>
      <p><strong>INDEMNIFICATION AND LIMITATION OF LIABILITY</strong></p>
      <p>The customer indemnifies the supplier from any claims, liabilities, and expenses made by any third party vendors or customers of the customer.<br>The supplier shall not be liable for the damages, loss of profits, indirect or consequential, direct, or special resulting from the use or sale of the goods.</p>
      <p><strong>CONFIDENTIALITY</strong></p>
      <p>The prices of the goods and other information contained in this agreement is confidential and will not be disclosed by either party unless with prior written consent of the other party.</p>
      <p><strong>GOVERNING LAW</strong></p>
      <p>This Agreement will be governed by and construed in accordance with the laws of the supplier&rsquo;s headquarters location.</p>
      <p><strong>ACCEPTANCE</strong></p>
      <p>Both parties understand and accept the wholesale arrangement stipulated under this agreement.<br>Once a wholesale account has been approved with the supplier, the customer shall be bound by this agreement from that time.</p>
    `,
  },

  "terms-conditions/terms-of-sale": {
    title: "Terms of Sale",
    html: `
      <p><strong>ARKequine (Ireland)</strong></p>
      <p><strong>General Terms and Conditions of Sale (&ldquo;Terms&rdquo;)</strong></p>
      <p>In these terms of sale &lsquo;Company&rsquo; means ARKequine, (trading as Ark Animal Care Ltd) Company Number 117201, and &lsquo;Customer&rsquo; means the person or company to whom the document is addressed.</p>
      <p>These terms shall form the basis of the contract between the company and the customer. Notwithstanding anything to the contrary in the customer&rsquo;s standard conditions of purchase, these conditions shall apply save where otherwise expressly agreed in writing by the company. No representative or agent of the company has authority to vary these terms or to make representations or warranties about the condition of the Company&rsquo;s products, their fitness for any purpose, or any other matter whether relating to the products or these terms or otherwise either orally or in writing.</p>
      <p>Unless otherwise expressly stated in writing, all prices quoted by the company incorporate these terms and are an invitation to treat. The customer&rsquo;s order is an offer on these terms which will become binding upon the company posting its confirmation of the order, or by the company making delivery to the customer. The Company reserves the right to recover any cost, loss or expense arising from customer cancellation or variation of an order confirmed by the Company.</p>
      <p>Whilst every precaution is taken in the production, packaging and shipping of the products, the customer shall carry a thorough inspection of the products within five working days of their delivery and shall give written notification with vouching photographs to the company&rsquo;s email enquiries@ark-equine.com of any defects which a reasonable examination would have revealed. No claims will be accepted thereafter. Any liability of the company under this clause shall be limited to the invoice value of the products or replacement and the company shall not be liable for any consequential loss arising.</p>
      <p>Unless otherwise stated, all prices assume delivery in full loads. The company reserves the right to charge extra for delivery in partial loads where requested by the customer. Route of delivery shall be at the discretion of the company. Where the invoice value of the products does not exceed &euro;150.00 or &pound;120.00, cost of delivery shall be charged in addition of the price.</p>
      <p>The customer shall note any claim for short delivery on the delivery schedule at the time of delivery and shall confirm such claim in writing to the company&rsquo;s head office email enquiries@ark-equine.com within five working days from the date of delivery. Compliance with this requirement shall be a condition precedent to any claim for short delivery. If short delivery does take place, the customer undertakes not to reject the goods but to accept the goods delivered as a part performance of the contract.</p>
      <p>The company will use all reasonable endeavours to despatch the products on a specified delivery date but does not guarantee to do so. Time of delivery shall not be of the essence of the contract unless expressly so stipulated in writing. If manufacture or delivery is delayed by force majeure, pandemic, strikes, lockouts, fire, consequences of war, accidents, defective materials, delays in receipt of raw materials or brought in products or components, or any other cause beyond the reasonable control of the company, the company may at its option rescind the contract without cost or compensation or seek a reasonable extension of time for delivery.</p>
      <p>If the customer fails to take delivery on the agreed date or, if no specific date has been agreed, when the products are ready for despatch and the company has given written notice of such readiness, the company shall be entitled to store and insure the products and to recoup the cost of same by way of additional charge to the customer.</p>
      <p>Products may only be returned to the company following its written consent to accept back same. A credit note will not be issued for any products returned by the customer to the company which were delivered to the customer more than six months previously or have less than six months shelf life before expiry date on the date of such return.</p>
      <p>Prices quoted include VAT. Any variations to prices quoted resulting from increase in government taxes or levies both on the products and on the raw materials will be for the customer&rsquo;s account.</p>
      <p>The customer shall pay strictly net 30 days after the date of invoice and shall pay interest on overdue accounts at 4 per cent above the European Central Bank Fixed Tender Rate, with interest at the rate calculated and accruing daily.</p>
      <p>Ownership of products delivered by the company shall only be transferred to the customer when the customer has paid for the products in full and met all that is owing to the company on whatever grounds and until then the customer shall hold the products in trust for the company and to its order. The risk of accidental deterioration or destruction of the products shall pass on delivery and the customer shall insure against such risk.</p>
      <p>The customer shall pay all accounts in full and not exercise any rights of set-off or counterclaim against invoices submitted.</p>
      <p>All new customer account set-up &amp; subsequent orders are accepted subject to trade references being satisfactory.</p>
      <p>Any disputes which may arise out of this contract shall be determined in accordance with the laws of the Republic of Ireland.</p>
      <p>If the customer is in breach of any of its obligations under this contract or if the customer offer to make an arrangement with his creditors or commits an act of Bankruptcy or in the case of a limited company and examiner or receiver is appointed or a petition to wind up the customer is presented the company can forthwith terminate the contract.</p>
      <p>The Company shall be under no liability to respect of any damage or loss to third parties caused directly or indirectly by the customer&rsquo;s breach of these conditions and the customer shall at all times indemnify the company against any such loss or damage or demands or claims and costs or expenses in connection therewith.</p>
      <p>Products are intended for sale only to the Customer and shall not be exported and it is a condition of sale that the customer guarantees that any products purchased will be dealt with in a conformity with appropriate current statutory requirements and in conformity with any recommendations made by the company for the relevant products. The customer shall not adulterate the products in any way or give any representation on behalf of the company other than those contained in the company&rsquo;s data sheet, relating to the products nor shall the customer interfere in any way with the labels and other markings used by the company for the packaging of the products.</p>
    `,
  },

  "privacy-policy": {
    title: "Privacy Policy",
    html: `
      <p><strong>PRIVACY POLICY</strong></p>
      <p>ARK Equine<br>Registered Office:</p>
      <p>Newbridge Industrial Estate,<br>Newbridge,<br>Co. Kildare,<br>W12 YF63,<br>Ireland.</p>
      <p>We at ARK Equine respect your right to privacy and comply with our obligations under the Data Protection Acts 1988 and 2002. The purpose of this Website Privacy Policy is to outline how we deal with any personal data you provide to us.</p>
      <p><strong>TYPES OF INFORMATION COLLECTED</strong></p>
      <p><strong>PERSONAL DATA</strong><br>This is data that identifies you or can be used to identify or contact you and may include your name, address, email address, telephone number and billing and credit card, CV information. Such information is only collected from you if you voluntarily submit it to us.</p>
      <p><strong>NON-PERSONAL DATA</strong><br>Like most websites, we gather statistical and other analytical information collected on an aggregate basis of all visitors to our website. This Non-Personal Data comprises information that cannot be used to identify or contact you. This information is used by ARK Equine for research purposes only.</p>
      <p><strong>PURPOSE OF WHICH WE HOLD YOUR INFORMATION</strong></p>
      <p><strong>PERSONAL DATA</strong><br>Personal data provided may be used by ARK Equine for the following purposes:<br>(a) To provide you with the goods or services you have ordered.<br>(b) To contact you if required in relation to your order or to respond to any communications you may have.<br>(c) Inform you of upcoming events, special offers and new products we feel that may be of interest to you.<br>You may unsubscribe from our promotional contact list at any time by replying to a promotional e-mail with the word &ldquo;unsubscribe&rdquo; or by contacting enquiries@ark-equine.com with the word UNSUBSCRIBE in the subject line. Please note you may still receive emails regarding orders that you place or other legitimate business interests.</p>
      <p><strong>NON-PERSONAL DATA</strong><br>We use the Non-Personal Data gathered from visitors to our website in an aggregate form to get a better understanding of where our visitors come from and to help us better design and organize our website to provide you with an enhanced customer experience.</p>
      <p><strong>INTEREST-BASED ONLINE ADVERTISING AND GOOGLE ANALYTICS</strong></p>
      <p>This section of our Privacy Notice provides details about interest-based online advertising (also called &ldquo;targeted advertising&rdquo;, &ldquo;remarketing&rdquo;, or &ldquo;behavioural advertising&rdquo;), Google Analytics, and your choices with respect to this type of advertising.</p>
      <p>We use Google Analytics&rsquo; 3rd-party audience data such as age, gender and interests to better understanding the behavior of our customers and work with companies that collect information about your online activities to provide advertising targeted to suit your interests and preferences. For example, you may see certain ads on this website or other websites because we contract with Google and other similar companies to target our ads based on information we or they have collected, including information that was collected through automated means (such as cookies and web beacons). These companies also use automated technologies to collect information when you click on our ads, which helps track and manage the effectiveness of our marketing efforts.</p>
      <p>You may opt out of the automated collection of information by third-party ad networks for the purpose of delivering advertisements tailored to your interests, by visiting the consumer opt-out page for the Self-Regulatory Principles for Online Behavioural Advertising at <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener">http://www.aboutads.info/choices/</a> and edit or opt-out your Google Display Network ads&rsquo; preferences at <a href="http://www.google.com/ads/preferences/" target="_blank" rel="noopener">http://www.google.com/ads/preferences/</a>. Because those opt-out and preference control pages are specific to the individual browser used to visit it, and because that page is not operated by the ARK Equine, we are unable to perform the opt-outs on your behalf.</p>
      <p><strong>HOW WE USE THE INFORMATION WE COLLECT</strong><br>When we collect information from you, we may use it for a number of purposes, including to:</p>
      <p>Process, manage, complete and account for transactions, including purchases and refund, exchange and layaway requests<br>Provide our products and services to you<br>Identify your product and service preferences<br>Improve merchandise selections and customer service<br>Invite you to participate in customer research<br>Notify you about new products, services, features, promotions, events and special offerings relating to ARK Equine business we think you will find valuable<br>Provide customer support and respond to your requests, comments and inquiries<br>Create and manage online accounts you establish<br>Enrol you in and administer our loyalty and other rewards programs upon your request<br>Administer your participation in promotions, contests and sweepstakes<br>Verify your identity in certain instances (such as when you pay by check, return merchandise, or request a refund)<br>Protect against, identify and help prevent fraud, unauthorized activity, claims and other liabilities and minimize credit risk<br>Comply with and enforce applicable legal requirements and industry standards<br>We also may use the information in other ways for which we provide specific notice at the time of collection.</p>
      <p>In addition, we use information collected online through automated means for purposes such as (i) customising our users&rsquo; visits to our Website and mobile applications; (ii) delivering content (including advertising) tailored to our users&rsquo; interests and the manner in which our users browse our Website and mobile applications; (iii) measuring and managing the advertising effectiveness of our online and offline advertisements and events; and (iv) managing our business. We also use this information to help diagnose technical and service problems, administer our Website and mobile applications, identify users of our Website and mobile applications, and gather demographic information about our users. We use clickstream data to determine how much time users spend on web pages of our websites, how users navigate through our websites, and how we may tailor our websites to better meet the needs of our users. In order for us to maintain the accuracy of your personal information and improve our communication with you, we may also supplement the information we collect with other public demographic information.</p>
      <p>&ldquo;We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. Website usage data is captured using first and third-party cookies and other tracking technologies to determine the popularity of products/services and online activity. Additionally, we use this information for site optimization, fraud/security purposes, and advertising. For more information about how Microsoft collects and uses your data, visit the Microsoft Privacy Statement.&rdquo;</p>
      <p><strong>COOKIES</strong><br>ARK Equine uses &ldquo;cookie&rdquo; technology. A cookie is a little piece of text stored by the browser on your computer, at the request of our server. We may use cookies to deliver content specific to your interests and to save your personal preferences so you do not have to re-enter them each time you connect to our website. Our cookies are not available to third parties. You can still use our website if you have cookies turned off. We have third-party plugins on our site which use cookies to improve and personalise your experience.</p>
      <p><strong>DISCLOSURE OF INFORMATION</strong><br>It is our company policy not to disclose any personal information with any third party. Your data will be managed securely by ARK Equine and only used by ARK Equine or its service providers (such as payment processing services) to provide services to you on our behalf.</p>
      <p><strong>UPDATING, VERIFYING AND DELETING PERSONAL DATA</strong><br>You may inform us of any changes in your personal data, and in accordance with our obligations under the Data Protection Acts 1988 and 2003, we will update or delete your personal data accordingly.</p>
      <p><strong>CHANGES TO OUR PRIVACY POLICY</strong><br>Any changes to this Website Privacy Policy will be posted on this website so you are always aware of what information we collect and how we use it.</p>
    `,
  },

  "delivery-policy": {
    title: "Delivery Policy",
    html: `
      <p>DELIVERY</p>
      <p>Thank you for shopping with ARKequine. As soon as your order is placed, every effort will be made to have your products dispatched next day.</p>
      <p>We are delighted to offer <strong>Free Delivery</strong> on orders over &pound;75 or &euro;85 for ROI and UK only.</p>
      <p><strong>ROI (&amp; Northern Ireland)</strong></p>
      <p>Our delivery partner is An Post. Delivery charges are based on product weight and destination.<br>
      Delivery time is 3-5 working days. You can check the status of your delivery via the tracking page, please click <a href="https://www.anpost.com/Post-Parcels/Track/Search" target="_blank" rel="noopener">here</a><br>
      Costs: &euro;5.20 per 30KG</p>
      <p><strong>UK</strong></p>
      <p>Our delivery partner is DPD. Delivery charges are based on product weight and destination.<br>
      Delivery time is 7-10 working days. You can check the status of your delivery via the tracking page, please click <a href="https://www.dpd.co.uk/service/" target="_blank" rel="noopener">here&nbsp;</a><br>
      Costs: &pound;9.24 per 30KG *UK mainland<br>
      Costs: &pound;22.10 up to 30KG **UK Off-shore Islands</p>
      <p><strong>EUROPE</strong></p>
      <p>We are currently not shipping to any European customers. If you are a trade / wholesale business please email us (enquries@ark-equine.com).</p>
      <p><strong>UNDELIVERED</strong></p>
      <p>If a parcel is returned to us because it couldn&rsquo;t be delivered ARKequine&reg; is not liable to refund the postage. If you are not in to sign for the delivery, most couriers will leave a note regarding pickup or new delivery arrangement. But if they don&rsquo;t leave a note and the parcel ends up in a depot to be returned to us we will just refund you the value of the product.</p>
    `,
  },

  "cookie-policy": {
    title: "Cookie Policy",
    html: `
      <p>COOKIE POLICY</p>
      <p>To make full use of the online shopping and personalised features on www.ark-equine.com your computer, tablet or mobile phone will need to accept cookies, as we can only provide you with certain personalised features of this website by using them. Our cookies do not store sensitive information such as your name, address, or payment details: they simply hold the &lsquo;key&rsquo; that, once you are signed in, is associated with this information. However, if you would prefer to restrict, block, or delete cookies from www.ark-equine.com, or any other website, you can use your browser to do this. Each browser is different, so check the &lsquo;Help&rsquo; menu of your browser (or your mobile phone&rsquo;s handset manual) to learn how to change your cookie preferences.</p>
      <p>WHAT ARE COOKIES</p>
      <p>Cookies are tiny text files stored on your computer when you visit certain web pages. At www.ark-equine.com, we use cookies to keep track of what you have in your basket, and to remember you when you return to our site. To order products on www.ark-equine.com, you need to have cookies enabled &ndash; see the section on managing cookies. If you do not wish to enable cookies, you will still be able to browse the site and use it for research purposes. Most web browsers have cookies enabled, but see managing cookies for help should you need it. Please note that cookies cannot harm your computer. We do not store personally identifiable information in cookies we create, but we do use encrypted information gathered from them to help improve your experience of the site. For example, they help us to identify and resolve errors, or to determine relevant related products to show you when you are browsing.</p>
      <p>MANAGING COOKIES</p>
      <p>If cookies are not enabled on your computer, it will mean that your shopping experience on our website will be limited to browsing and researching; you will not be able to add products to your basket and buy them.</p>
      <p>BANNER ADVERTISING ON OTHER WEBSITES</p>
      <p>This type of advertising is designed to provide you with a selection of products based on what you are viewing on www.ark-equine.com which are presented to you when you visit other selected websites. The adverts may highlight alternative styles and colours as well as products from other categories deemed relevant to your browsing history. The technology behind these adverts is based on cookies.</p>
      <p>DISABLING THESE ADVERTS</p>
      <p>Most browsers allow you to refuse to accept cookies. (For example, in Internet Explorer you can refuse all cookies by clicking &ldquo;Tools&rdquo;,&rdquo;Internet Options&rdquo;, &ldquo;Privacy&rdquo;, and selecting Block all cookies&rdquo; using the sliding selector.) This will, however, have a negative impact upon the usability of many websites, including this one.</p>
      <p>HOW COOKIES ARE USED ON THIS SITE</p>
      <p>At www.ark-equine.com we use 2 different types of cookie:-Session Cookies are temporary cookies that are not stored on your computer or mobile device.<br>
      They are used as part of the registration process for financial security purposes. A session cookie is also used to remember your language preference when viewing the site. These session cookies are erased when you close your browser, or after 20 minutes of inactivity. Persistent cookies are those placed on your computer or mobile device for a pre-determined length of time when you visit this site. This site only places cookies that are specific to this site. The www.ark-equine.com site has introduced Google Analytics to assist in developing the website to ensure we provide relevant information in a easily accessible format.</p>
      <p>YOUR PRIVACY</p>
      <p>Please be assured that the data contained in the cookie used in these adverts is completely anonymous and does not contain any of your personal details. To read our full Privacy Policy <a href="/privacy-policy">click here</a>.</p>
      <p>© Copyright – ARKequine</p>
    `,
  },

  "returns-policy": {
    title: "Returns Policy",
    html: `
      <p><strong>RETURNS POLICY</strong></p>
      <p>Customer satisfaction is important to us at ARKequine. If, however, you are not completely satisfied with an item purchased from www.ark-equine.com you may return it to us within 14 days of receiving your order for a refund. We endeavour to process your return within 5-10 working days of receipt, however, this is not guaranteed. Returned goods are your responsibility until they are received by us, we strongly recommend you obtain proof of postage and use a trackable service. Please ensure the goods are packaged sufficiently and that they cannot be damaged during transit to us. Please retain your receipt, as it is required for to process any refund. Unwanted goods must be returned in a fully resale-able condition and any tags must be intact and in their original packaging. We reserve the right to refuse a refund if goods are not returned in a saleable condition or are damaged.</p>
      <p><strong>HOW TO RETURN</strong></p>
      <p>If you choose to return any unwanted goods you must cover the cost of the return shipping. We do not offer free returns. Please take-care to repack your unwanted items back into the outer packaging your items arrived in. Ensure it is packed safely, and securely, and take time to make sure it is sealed and waterproof. You will need to print and return a customer RETURN FORM, please click <a href="/contact-us">here</a> to download. Failure to do so will mean your return will not be processed.</p>
      <p><strong>WHERE TO SEND MY RETURN</strong></p>
      <p>Please send the unwanted items, appropriately packed containing the RETURN FORM, to the following address.<br>
      ARKequine<br>
      Returns Department<br>
      Newbridge Industrial Estate<br>
      Newbridge<br>
      Co. Kildare<br>
      W12 YF63<br>
      Ireland</p>
      <p><strong>CAN I GET A REFUND OR EXCHANGE</strong></p>
      <p>At present, we are not offering exchange on returned items. We offer refunds on returned goods for all customers in ROI, Northern Ireland and UK. We reserve the right to refuse a refund if goods are not returned in a saleable condition or are damaged.</p>
      <p><strong>WHAT IF MY ITEM IS FAULTY</strong></p>
      <p>In accordance with the Consumer Rights Act 2015, if you believe an item is faulty, cannot be fixed or replaced, please contact our customer services team <a href="/contact-us">here</a>.</p>
    `,
  },
};

// Shaped so a future ACF wysiwyg fetch can replace this lookup 1:1.
export function getPolicyContent(slug: string): PolicyContent | null {
  return POLICIES[slug] ?? null;
}
