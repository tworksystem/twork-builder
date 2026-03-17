import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        doctorImage,
        imageHeight,
        imageObjectFit,
        imageObjectPosition,
        showBadge,
        badgeText,
        departmentSlug,
        departmentLabel,
        doctorName,
        qualifications,
        gender,
        profileUrl,
        profileOpenInNewTab,
        bookUrl,
        bookOpenInNewTab,
        profileButtonText,
        bookButtonText
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'doctor-card',
        'data-dept': (departmentSlug && String(departmentSlug).trim()) || 'general',
        'data-gender': (gender && String(gender).trim()) || 'male',
        'data-name': (doctorName && String(doctorName).trim()) || ''
    });

    const deptLabels = {
        heart: 'Heart Centre',
        neuro: 'Neuro Centre',
        cancer: 'Cancer Centre',
        peds: 'Paediatrics',
        general: 'General Medicine',
        ent: 'ENT',
        dental: 'Dental'
    };
    const resolvedDeptLabel = departmentLabel || deptLabels[departmentSlug] || departmentSlug;

    return (
        <div {...blockProps}>
            <div
                className="doc-img-wrapper"
                style={{
                    position: 'relative',
                    height: `${Number(imageHeight) || 260}px`,
                    overflow: 'hidden',
                    background: '#f0f0f0'
                }}
            >
                {doctorImage && (
                    <img
                        src={doctorImage}
                        alt={doctorName || ''}
                        decoding="async"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: imageObjectFit,
                            objectPosition: imageObjectPosition,
                            display: 'block'
                        }}
                    />
                )}
                {showBadge && badgeText && (
                    <span className="doc-badge">{badgeText}</span>
                )}
            </div>

            <div className="doc-content">
                <span className="doc-dept">{resolvedDeptLabel}</span>
                <RichText.Content
                    tagName="h4"
                    value={doctorName}
                    className="doc-name"
                />
                <RichText.Content
                    tagName="p"
                    value={qualifications}
                    className="doc-qual"
                />
                <div className="doc-actions">
                    <a
                        href={profileUrl || '#'}
                        className="jivaka-btn btn-outline"
                        target={profileOpenInNewTab ? '_blank' : undefined}
                        rel={profileOpenInNewTab ? 'noopener noreferrer' : undefined}
                    >
                        {profileButtonText || 'Profile'}
                    </a>
                    <a
                        href={bookUrl || '#'}
                        className="jivaka-btn btn-primary"
                        target={bookOpenInNewTab ? '_blank' : undefined}
                        rel={bookOpenInNewTab ? 'noopener noreferrer' : undefined}
                    >
                        {bookButtonText || 'Book'}
                    </a>
                </div>
            </div>
        </div>
    );
}
