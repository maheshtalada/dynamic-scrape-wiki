const { areasServed } = require('assets/static/metros-served-config').default;

export function advertiseWithUs() {
    return (
        `<p>1) Your name</p>
        <p>2) Company</p>
        <p>3) Contact number</p>
        <p>4) Nature of advertisement</p>
        <p>5) Content</p>
        <p class="ql-indent-1">&lt;attach your content here in jpeg/png format - 300 x 300 size&gt;</p>
        <p>6) Markets (remove ones that do not apply)</p>
        ${areasServed.map(area => {
            return (`<p class="ql-indent-1">${area.mlsAreaName}</p>`);
        }).join(' ')}
        <p>7) Any other Information</p>
        <p class="ql-indent-1">&lt;Describe&gt;</p>`
    )
}

export function reportIssue() {
    return (
        `<p>1)Issue Summary</p>
        <p class="ql-indent-1">&nbsp;&lt;Brief description of your issue&gt;</p>
        <p>2)Screenshot uploaded - Yes / No</p>
        <p class="ql-indent-1">&nbsp;&lt;Taking a screenshot and uploading it here will help us investigate your issue better&gt;</p>
        <p>3)Steps to reproduce</p>
        <p class="ql-indent-1">&nbsp;&lt;Steps, expected results, actual results, etc&gt;</p>`
    )
}

export function becomePreferredVendor() {
    return (
        `<p>1) Registered Email ID</p>
        <p class="ql-indent-1">&lt;Provide the email ID used while registering in our site&gt;</p>
        <p>2) Profile updated - Yes / No</p>
        <p class="ql-indent-1">&lt;Is your photo, summary and other information updated in our site&gt;</p>
        <p>3) Are you a real estate investor? - Yes / No</p>
        <p>4) Are you a Property Manager? - Yes / No</p>
        <p>5) Areas of Expertise (remove ones that do not apply)</p>
        <p class="ql-indent-1">Pre purchase due diligence</p>
        <p class="ql-indent-1">Offer placement &amp; Negotiation</p>
        <p class="ql-indent-1">Getting a loan</p>
        <p class="ql-indent-1">Closing</p>
        <p class="ql-indent-1">Getting an insurance policy</p>
        <p class="ql-indent-1">Pre lease fix up</p>
        <p class="ql-indent-1">Leasing</p>
        <p class="ql-indent-1">Property management</p>
        <p>6) How many years experience do you have working with out of state and local investors?</p>
        <p class="ql-indent-1">&lt;Please describe your investment experience&gt;</p>`
    )
}

export function companyUpdates() {
    return (
        `<p>Please provide us with the following information:</p>
        <p>1) Logo attached - Yes / No</p>
        <p class="ql-indent-1">&lt;attach your logo here in jpeg/png format - 300 x 300 size&gt;</p>
        <p>2) About</p>
        <p class="ql-indent-1">&nbsp;&lt;Summary about your company in 5000 characters&gt;</p>
        <p>3) Links</p>
        <p class="ql-indent-1">Website URL: &lt;Your Link Here&gt;</p>
        <p class="ql-indent-1">Facebook URL: &lt;Your Link Here&gt;</p>
        <p class="ql-indent-1">Twitter URL: &lt;Your Link Here&gt;</p>
        <p>4) Specialties (remove ones that do not apply)</p>
        <p class="ql-indent-1">Residential Investments</p>
        <p class="ql-indent-1">Commercial Properties</p>
        <p class="ql-indent-1">Income Specialist</p>
        <p class="ql-indent-1">Residential Lending</p>
        <p class="ql-indent-1">Commercial Lending</p>
        <p class="ql-indent-1">Industrial</p>
        <p class="ql-indent-1">Farm and Land</p>
        <p class="ql-indent-1">Appraisal</p>
        <p class="ql-indent-1">Property Management</p>
        <p class="ql-indent-1">Land Development</p>
        <p class="ql-indent-1">Urban Planning</p>
        <p class="ql-indent-1">Legal</p>
        <p class="ql-indent-1">Research</p>
        <p class="ql-indent-1">Back Office Specialist</p>`
    )
}
/*
module.exports = {
    advertiseWithUs,
    reportIssue,
    becomePreferredVendor,
    companyUpdates
};*/
