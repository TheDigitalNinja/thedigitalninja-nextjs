/**
 * @file src/app/(clean)/resume/page.tsx
 * @fileoverview Resume page component for The Digital Ninja website
 * @description Displays Russell Perkins' professional experience, skills, and education.
 * 
 * @component Resume
 * @returns {JSX.Element} The rendered resume page with professional information
 */

export default function Resume() {
  return (
    <main className="container mx-auto py-8">
      <div className="prose dark:prose-invert mx-auto max-w-3xl">
        <h2>Russell Perkins</h2>
        <p>Principal Technical Consultant Lead - Denver, Colorado</p>

        <h3>Summary</h3>
        <p>
          Over a decade of professional experience and a passion for the latest technologies,
          server configurations, and programming techniques. Communicates well and takes
          pride at being a team player. Follows best practices and can find unique solutions
          for any problem.
        </p>

        <h3>Experience</h3>
        <h4>AHEAD - Solutions Architect</h4>
        <p>October 2022 - Present</p>
        <p>
        AHEAD builds platforms for digital business. By weaving together advances in cloud infrastructure, automation and analytics, 
        and software delivery, we help enterprises deliver on the promise of digital transformation.
        </p>

        <h4>Wodify - Senior DevOps Engineer</h4>
        <p>May 2021 - October 2022</p>

        <h4>Kenzan - Platform & DevOps Engineer III</h4>
        <p>October 2015 - May 2021</p>
        <p>
          Consultant for many industry leaders.
        </p>
        <ul>
          <li>Managed AWS based immutable infrastructure system</li>
          <li>Support and facilitated continuous integration and deployment</li>
          <li>Managed Jenkins at scale with hundreds of jobs and dozens of developers</li>
          <li>Deploy Java-based, cloud-native microservices with Asguard and Spinnaker</li>
          <li>Troubleshoot and repair issues in IAM, EC2, Route53, VPC, S3, and SNS</li>
          <li>Automate the creation of AMI&apos;s with Ansible, Packer, BASH, and Python</li>
          <li>Automate provisioning, deployment, and platform configuration tasks</li>
          <li>Client Support with Linux Administration and troubleshooting</li>
        </ul>

        <h4>The Evoke Group - Web Development Manager, Systems Architect, Lead Developer</h4>
        <p>January 2014 - August 2015</p>
        <p>
        Built consistent, scalable, repeatable, business solutions to allow our company to grow in revenue every quarter. 
        Created training materials and trained all staff members on best practices for coding and responsive design. 
        Built over 31 and custom websites in WordPress from the ground up. No purchased themes.
        </p>
        <ul>
          <li>Architected entire company&apos;s infrastructure, from in wall networking, dev servers, to aws cloud infrastructure.</li>
          <li>Handled all deployments to both our aws systems and various client systems.</li>
          <li>Managed nightly backups to an onsite nas and offsite with S3 and glacier.</li>
          <li>Maintained developer tools such as grunt and built multiple in house tools for developers and sales staff.</li>
        </ul>

        <h4>Digital Shift Studios - Consultant / Contractor</h4>
        <p>September 2010 - January 2014</p>
        <ul>
          <li>Systems administration - Linux, Windows Server, AWS, Linode, Puppet</li>
          <li>Web design and development - HTML5, CSS3, SASS, LESS, Bootstrap, jQuery, PHP, Node.js</li>
          <li>Database installation, replication, backups for MongoDB, MySQL, Postgres</li>
        </ul>

        <h4>Listener Approved LLC - Senior Systems Administrator</h4>
        <p>October 2011 - September 2013</p>
        <ul>
          <li>Built and managed Linode and AWS cloud hosting for scalable Node.js apps and Apache</li>
          <li>Setup and managed MySQL, Amazon RDS and MongoDB databases with replication</li>
        </ul>

        <h4>MBS - Systems Admin</h4>
        <p>May 2010 - August 2011</p>
        <ul>
          <li>Supported large Apache web farm and over 100 servers and vSphere VMs</li>
          <li>Used Puppet for server configurations</li>  
        </ul>

        {/* ... Additional experience ... */}

        <h3>Education</h3>
        <h4>Rolla Technical Institute</h4>
        <p>Computers and Networking, 2000 - 2003</p>
      </div>
    </main>
  );
}

