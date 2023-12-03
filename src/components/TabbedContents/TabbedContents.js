import React, {useEffect, useState} from 'react';

const TabbedContent = ({tabs, identifier}) => {
    const localStorageKey = `activeTab-${identifier}`;
    const [activeTab, setActiveTab] = useState(
        parseInt(localStorage.getItem(localStorageKey)) || 0
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, activeTab);
    }, [activeTab, localStorageKey]);

    return (
        <div className="tabs">
            <div className="tab-titles">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-title ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default TabbedContent;
