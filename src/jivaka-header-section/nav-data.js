export const DEFAULT_LOGO_IMAGE =
	'https://jivakahospital.com/wp-content/uploads/2025/12/0-02-06-a90eb79c273489ee9c9d50c8cd87cd8185f0ff16619e0905d2055889329a1c5a_2231d085a20.jpg';

export const DEFAULT_NAV_ITEMS = [
	{
		label: 'Home',
		url: 'home',
		type: 'link',
	},
	{
		label: 'About Jivaka',
		url: '#',
		type: 'dropdown',
		children: [
			{ label: 'About Us', url: '/about/' },
			{ label: 'Mission & Vision', url: '/about/#mission' },
			{ label: 'Management Team', url: '/about/#team' },
			{ label: 'Facilities & Gallery', url: '/facilities/' },
			{ label: 'Accreditations & Awards', url: 'accreditations-awards' },
			{ label: 'Corporate Social Responsibility', url: 'csr' },
			{ label: 'Careers', url: 'career' },
		],
	},
	{
		label: 'Clinical Departments',
		url: '#',
		type: 'mega',
		children: [
			{
				groupTitle: 'Centres of Excellence',
				links: [
					{ label: 'Heart Centre', url: 'heart-centre' },
					{ label: 'Neuro Centre', url: 'neuro-centre' },
					{ label: 'OG', url: 'og' },
				],
			},
			{
				groupTitle: 'Medical Specialties',
				links: [
					{ label: 'General Medicine', url: 'general-medicine' },
					{ label: 'Orthopaedic Centre', url: 'orthopaedic-centre' },
					{ label: 'Urology Centre', url: 'urology-centre' },
				],
			},
			{
				groupTitle: 'Surgical Specialties',
				links: [
					{ label: 'General Surgery', url: 'general-surgery' },
					{ label: 'Health Check-up', url: 'health-check-up' },
					{ label: 'Ambulance Service', url: 'ambulance-service' },
				],
			},
			{
				groupTitle: 'Support Services',
				links: [
					{ label: '24/7 Emergency', url: '24-7-emergency' },
					{ label: 'Radiology & Imaging', url: 'radiology-imaging' },
					{ label: 'Laboratory Services', url: 'laboratory-services' },
					{ label: 'Pharmacy', url: 'pharmacy' },
				],
			},
		],
	},
	{
		label: 'Doctors',
		url: '/doctors/',
		type: 'link',
	},
	{
		label: 'Patient Info',
		url: '#',
		type: 'dropdown',
		children: [
			{ label: 'Health Packages', url: 'packages' },
			{ label: 'Inpatient Guide', url: 'patient-guide' },
			{ label: 'Visitor Policy', url: 'patient-guide/#visiting' },
			{ label: 'Insurance Partners', url: 'patient-guide/#insurance' },
			{ label: 'Health Blog & News', url: 'blog' },
			{ label: 'International Patients', url: 'international-patients' },
			{ label: 'TeleConsultation', url: 'teleconsultation' },
		],
	},
	{
		label: 'Contact',
		url: '/contact/',
		type: 'link',
	},
];

export function resolveNavItems( navItems ) {
	if ( Array.isArray( navItems ) ) {
		return navItems;
	}

	return DEFAULT_NAV_ITEMS;
}
