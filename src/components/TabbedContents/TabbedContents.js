import React, {useEffect, useState} from 'react';

const TabbedContent = ({tabs, identifier}) => {
    const localStorageKey = `activeTab-${identifier}`;
    const [activeTab, setActiveTab] = useState(
        parseInt(localStorage.getItem(localStorageKey)) || 0
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, activeTab);
    }, [activeTab, localStorageKey]);

    const handleTabChange = (newTabIndex) => {
        // Call onLeave for the currently active tab
        if(tabs[activeTab] && tabs[activeTab].onLeave) {
            tabs[activeTab].onLeave();
        }

        setActiveTab(newTabIndex);

        // Call onSelect for the new active tab
        if(tabs[newTabIndex] && tabs[newTabIndex].onSelect) {
            tabs[newTabIndex].onSelect();
        }
    };


    return (
        <div className="tabs">
            <div className="tab-titles">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab-title ${index === activeTab ? 'active' : ''}`}
                        onClick={() => handleTabChange(index)}
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
