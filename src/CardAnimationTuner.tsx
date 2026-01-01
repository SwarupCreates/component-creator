import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ANIMATION TUNER v2.0
 * Features:
 * - Dual-state card controls (Collapsed / Expanded)
 * - Dual-state icon controls (Collapsed / Expanded)
 * - Real-time preview with spring physics
 * - Code generator for easy export
 */

// --- HELPER ICONS ---
const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-slate-400">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
);

const CopyIcon = ({ copied }: { copied: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        {copied ? <polyline points="20 6 9 17 4 12"></polyline> : <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>}
        {copied ? null : <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>}
    </svg>
);


// --- SVG Component (Animates based on external variants) ---
const CloudSelectorAnimation = ({ cardVariants, iconVariants }: { cardVariants: any; iconVariants: any }) => {
    const animationTransition = {
        type: 'spring',
        stiffness: 400,
        damping: 35,
    };

    const expandedOpacityVariants = {
        collapsed: { opacity: 0, transition: { duration: 0.1, delay: 0 } },
        expanded: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } }
    };

    const collapsedOpacityVariants = {
        collapsed: { opacity: 1, transition: { duration: 0.4, delay: 0.1 } },
        expanded: { opacity: 0, transition: { duration: 0.1, delay: 0 } }
    };

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 236 123"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* --- COLLAPSED STATE GROUPS --- */}
            <motion.g variants={collapsedOpacityVariants}>
                {/* AZURE */}
                <motion.g variants={cardVariants.azure} transition={{ ...animationTransition, delay: 0.1 }}>
                    <rect x="147" y="7.5" width="89" height="108" rx="15" fill="#131317" stroke="#5A5D7B" strokeWidth="1" />
                    <motion.g variants={iconVariants.azure} transition={animationTransition}>
                        <path d="M193.649 39.7711L193.487 38.8849C192.778 38.2014 191.888 38.0722 191.002 38.2343L177.29 35.9554L177.357 35.965C178.247 36.0942 178.956 36.7778 179.119 37.6639L186.305 76.9009C186.563 78.3138 185.36 79.5644 183.94 79.3585L183.718 79.3262L198.471 81.4656C199.891 81.6715 201.094 80.4209 200.835 79.0081L193.649 39.7711Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M184.037 64.5192L186.305 76.9009C186.563 78.3138 185.36 79.5644 183.94 79.3585L183.498 79.295C182.972 79.2187 182.496 78.945 182.163 78.5301L170.746 64.2753C170.201 63.594 170.771 62.5956 171.635 62.7207L184.037 64.5192Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M177.381 35.969C178.26 36.1069 178.958 36.7861 179.119 37.6639L182.1 53.9416L177.238 63.5337L171.635 62.7207C170.771 62.5956 170.201 63.594 170.746 64.2753L174.491 68.9513L170.907 76.0257C170.499 76.829 169.625 77.2825 168.735 77.1535L158.586 75.6818C157.166 75.4759 156.368 73.9349 157.017 72.6538L175.052 37.0749C175.459 36.2717 176.333 35.8172 177.224 35.9462L177.381 35.969Z" fill="#131317" stroke="#5A5D7B" />
                    </motion.g>
                </motion.g>
                {/* AWS */}
                <motion.g variants={cardVariants.aws} transition={{ ...animationTransition, delay: 0.05 }}>
                    <rect x="73.5" y="7.5" width="89" height="108" rx="15" fill="#131317" stroke="#5A5D7B" strokeWidth="1" />
                    <motion.g variants={iconVariants.aws} transition={animationTransition}>
                        <path d="M92.928 67.12C91.4134 67.12 90.2027 66.688 89.296 65.824C88.3894 64.96 87.936 63.8027 87.936 62.352C87.936 60.7947 88.4907 59.552 89.6 58.624C90.7094 57.696 92.2027 57.232 94.08 57.232C95.2747 57.232 96.6187 57.4133 98.112 57.776V55.664C98.112 54.512 97.8507 53.7013 97.328 53.232C96.8054 52.7627 95.9147 52.528 94.656 52.528C93.184 52.528 91.744 52.7413 90.336 53.168C89.8454 53.3173 89.536 53.392 89.408 53.392C89.152 53.392 89.024 53.2 89.024 52.816V51.952C89.024 51.6747 89.0667 51.472 89.152 51.344C89.2374 51.216 89.408 51.0987 89.664 50.992C90.3254 50.6933 91.1627 50.4533 92.176 50.272C93.1894 50.0907 94.1974 50 95.2 50C97.2267 50 98.72 50.4213 99.68 51.264C100.64 52.1067 101.12 53.392 101.12 55.12V66.064C101.12 66.4907 100.907 66.704 100.48 66.704H99.104C98.6987 66.704 98.464 66.5013 98.4 66.096L98.24 65.04C97.472 65.7013 96.624 66.2133 95.696 66.576C94.768 66.9387 93.8454 67.12 92.928 67.12ZM93.696 64.72C94.4 64.72 95.136 64.5813 95.904 64.304C96.672 64.0267 97.408 63.6213 98.112 63.088V59.824C96.96 59.5467 95.8294 59.408 94.72 59.408C92.3094 59.408 91.104 60.336 91.104 62.192C91.104 63.0027 91.328 63.6267 91.776 64.064C92.224 64.5013 92.864 64.72 93.696 64.72Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M109.376 66.704C109.056 66.704 108.827 66.6453 108.688 66.528C108.549 66.4106 108.416 66.1706 108.288 65.808L103.552 51.664C103.424 51.28 103.36 51.0346 103.36 50.928C103.36 50.6293 103.52 50.48 103.84 50.48H105.664C106.005 50.48 106.245 50.5386 106.384 50.656C106.523 50.7733 106.645 51.0133 106.752 51.376L110.24 63.472L113.44 51.376C113.547 51.0133 113.675 50.7733 113.824 50.656C113.973 50.5386 114.208 50.48 114.528 50.48H116C116.32 50.48 116.555 50.5386 116.704 50.656C116.853 50.7733 116.981 51.0133 117.088 51.376L120.32 63.632L123.904 51.376C124.011 51.0133 124.133 50.7733 124.272 50.656C124.411 50.5386 124.651 50.48 124.992 50.48H126.72C127.04 50.48 127.2 50.6293 127.2 50.928C127.2 51.0346 127.136 51.28 127.008 51.664L122.144 65.808C122.016 66.1706 121.883 66.4106 121.744 66.528C121.605 66.6453 121.376 66.704 121.056 66.704H119.488C119.168 66.704 118.933 66.64 118.784 66.512C118.635 66.384 118.507 66.1386 118.4 65.776L115.2 54L112.032 65.776C111.925 66.1386 111.797 66.384 111.648 66.512C111.499 66.64 111.264 66.704 110.944 66.704H109.376Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M134.304 67.184C132.512 67.184 130.901 66.8853 129.472 66.288C129.216 66.1813 129.04 66.064 128.944 65.936C128.848 65.808 128.8 65.6053 128.8 65.328V64.432C128.8 64.048 128.928 63.856 129.184 63.856C129.333 63.856 129.6 63.92 129.984 64.048C131.392 64.496 132.853 64.72 134.368 64.72C135.413 64.72 136.208 64.5173 136.752 64.112C137.296 63.7067 137.568 63.12 137.568 62.352C137.568 61.84 137.402 61.424 137.072 61.104C136.741 60.784 136.138 60.464 135.264 60.144L132.544 59.12C130.176 58.2453 128.992 56.752 128.992 54.64C128.992 53.2533 129.53 52.1333 130.608 51.28C131.685 50.4267 133.098 50 134.848 50C136.234 50 137.589 50.2453 138.912 50.736C139.168 50.8213 139.349 50.9333 139.456 51.072C139.562 51.2107 139.616 51.4187 139.616 51.696V52.56C139.616 52.944 139.477 53.136 139.2 53.136C139.05 53.136 138.805 53.0827 138.464 52.976C137.333 52.6347 136.181 52.464 135.008 52.464C132.96 52.464 131.936 53.1573 131.936 54.544C131.936 55.0987 132.106 55.536 132.448 55.856C132.789 56.176 133.461 56.528 134.464 56.912L136.96 57.872C138.218 58.3627 139.125 58.944 139.68 59.616C140.234 60.288 140.512 61.1573 140.512 62.224C140.512 63.7387 139.946 64.944 138.816 65.84C137.685 66.736 136.181 67.184 134.304 67.184Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M140.689 69.7057C138.634 69.7353 136.209 70.2008 134.374 71.5092C133.807 71.9248 133.905 72.4797 134.53 72.4006C136.62 72.1431 141.224 71.5883 142.045 72.658C142.865 73.7076 141.129 78.1269 140.347 80.0895C140.113 80.6826 140.62 80.9221 141.147 80.466C144.582 77.5335 145.481 71.4099 144.778 70.518C144.427 70.0827 142.743 69.6756 140.689 69.7057ZM83.4583 70.7089C83.0007 70.7669 82.7933 71.3268 83.2766 71.7693C91.4263 79.2195 102.214 83.7041 114.187 83.7041C122.73 83.7041 132.666 80.9894 139.504 75.8749C140.626 75.0309 139.65 73.7481 138.506 74.273C130.838 77.5577 122.501 79.1575 114.915 79.1575C103.67 79.1575 92.7977 76.0213 83.9841 70.8419C83.7916 70.7264 83.6109 70.6899 83.4583 70.7089Z" fill="#131317" stroke="#5A5D7B" />
                    </motion.g>
                </motion.g>
                {/* GCP */}
                <motion.g variants={cardVariants.gcp} transition={animationTransition}>
                    <rect x="0" y="7.5" width="89" height="108" rx="15" fill="#131317" stroke="#5A5D7B" strokeWidth="1" />
                    <motion.g variants={iconVariants.gcp} transition={animationTransition}>
                        <path d="M38.0007 70.9447C38.7786 71.1517 39.6013 71.2496 40.3978 71.1204L51.6633 69.2912L53.1184 78.2529L41.8567 80.0815L41.8523 80.0783C38.6561 80.581 35.3834 80.0297 32.5288 78.5073L32.5285 78.5054L32.5328 78.5076L38.0007 70.9447Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M37.1299 50.968C34.0884 51.4748 31.2807 52.9173 29.0977 55.0946C26.9147 57.2719 25.4652 60.0756 24.9509 63.1152C24.4468 66.1514 24.907 69.2691 26.2669 72.03C27.6269 74.791 29.8183 77.0564 32.5328 78.5076L38.0068 70.9382C36.8168 70.6236 35.7617 69.9299 35.0016 68.962C34.2414 67.994 33.8175 66.8047 33.7941 65.5743C33.7707 64.3438 34.1492 63.1392 34.872 62.1431C35.5949 61.1469 36.6228 60.4134 37.8001 60.0538C38.9761 59.6856 40.2398 59.7079 41.4021 60.1175C42.5644 60.527 43.5628 61.3018 44.248 62.3258L49.7256 54.7772C48.0599 53.2164 46.0566 52.0608 43.8714 51.4002C41.6863 50.7397 39.3815 50.5914 37.1299 50.968Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M40.6924 38.5911C43.8445 37.0727 47.3296 36.3752 50.8234 36.5623C54.3169 36.7495 57.7066 37.8154 60.678 39.6616L62.0574 40.9059L56.3787 47.1467L55.3885 46.9889C50.1567 44.0158 43.4555 45.6918 40.1572 50.7165C40.1446 50.7356 40.1297 50.7543 40.1161 50.7746C39.1203 50.7383 38.1199 50.8024 37.1299 50.968C34.153 51.4641 31.4011 52.8573 29.2387 54.9577C29.2386 54.9501 29.2368 54.942 29.2377 54.9332C29.6075 51.4626 30.8526 48.1424 32.8562 45.2842C34.8597 42.4261 37.5558 40.1229 40.6924 38.5911Z" fill="#131317" stroke="#5A5D7B" />
                        <path d="M60.6871 39.6704C64.0559 41.7923 66.7309 44.8526 68.3832 48.4746L68.3793 48.4752C71.2626 49.7928 73.6428 52.0071 75.1643 54.7877C76.6858 57.5685 77.2671 60.7673 76.8219 63.9056C76.3652 67.0498 74.9102 69.9647 72.671 72.2193C70.4316 74.4739 67.5265 75.9494 64.3849 76.4279L53.1299 78.2554L51.9772 78.2546L50.5708 69.5926L51.6742 69.2898L62.9308 67.4729C66.0409 66.968 68.1568 64.0497 67.6558 60.9645C67.1538 57.8725 64.2239 55.7776 61.1139 56.2826L60.9326 55.1663C60.6886 53.4689 60.0615 51.8492 59.0981 50.4304C58.139 49.018 56.8716 47.8417 55.3923 46.9896L56.3787 47.1467L62.0574 40.9059L60.6871 39.6704Z" fill="#131317" stroke="#5A5D7B" />
                    </motion.g>
                </motion.g>
            </motion.g>

            {/* --- EXPANDED STATE GROUPS --- */}
            <motion.g variants={expandedOpacityVariants}>
                {/* AZURE */}
                <motion.g variants={cardVariants.azure} transition={{ ...animationTransition, delay: 0.1 }}>
                    <path d="M143.347 12.8449C144.536 4.64636 152.146 -1.03607 160.344 0.152827L218.733 8.62003C226.932 9.80893 232.614 17.4189 231.425 25.6174L220.232 102.81C219.043 111.009 211.433 116.691 203.234 115.502L144.845 107.035C136.646 105.846 130.964 98.236 132.153 90.0375L143.347 12.8449Z" fill="#B6DDFF" />
                    <motion.g variants={iconVariants.azure} transition={animationTransition}>
                        <path d="M193.649 39.7711C193.487 38.8849 192.778 38.2014 191.888 38.0722L177.29 35.9554L177.357 35.965C178.247 36.0942 178.956 36.7778 179.119 37.6639L186.305 76.9009C186.563 78.3138 185.36 79.5644 183.94 79.3585L183.718 79.3262L198.471 81.4656C199.891 81.6715 201.094 80.4209 200.835 79.0081L193.649 39.7711Z" fill="url(#paint0_linear_2496_555)" />
                        <path d="M184.037 64.5192L186.305 76.9009C186.563 78.3138 185.36 79.5644 183.94 79.3585L183.498 79.295C182.972 79.2187 182.496 78.945 182.163 78.5301L170.746 64.2753C170.201 63.594 170.771 62.5956 171.635 62.7207L184.037 64.5192Z" fill="#0078D4" />
                        <path d="M177.381 35.969C178.26 36.1069 178.958 36.7861 179.119 37.6639L182.1 53.9416L177.238 63.5337L171.635 62.7207C170.771 62.5956 170.201 63.594 170.746 64.2753L174.491 68.9513L170.907 76.0257C170.499 76.829 169.625 77.2825 168.735 77.1535L158.586 75.6818C157.166 75.4759 156.368 73.9349 157.017 72.6538L175.052 37.0749C175.459 36.2717 176.333 35.8172 177.224 35.9462L177.381 35.969Z" fill="url(#paint1_linear_2496_555)" />
                    </motion.g>
                </motion.g>
                {/* AWS */}
                <motion.g variants={cardVariants.aws} transition={{ ...animationTransition, delay: 0.05 }}>
                    <path d="M70 28C70 19.7157 76.7157 13 85 13H144C152.284 13 159 19.7157 159 28V106C159 114.284 152.284 121 144 121H85C76.7157 121 70 114.284 70 106V28Z" fill="#F59E0B" />
                    <motion.g variants={iconVariants.aws} transition={animationTransition}>
                        <path d="M92.928 67.12C91.4134 67.12 90.2027 66.688 89.296 65.824C88.3894 64.96 87.936 63.8027 87.936 62.352C87.936 60.7947 88.4907 59.552 89.6 58.624C90.7094 57.696 92.2027 57.232 94.08 57.232C95.2747 57.232 96.6187 57.4133 98.112 57.776V55.664C98.112 54.512 97.8507 53.7013 97.328 53.232C96.8054 52.7627 95.9147 52.528 94.656 52.528C93.184 52.528 91.744 52.7413 90.336 53.168C89.8454 53.3173 89.536 53.392 89.408 53.392C89.152 53.392 89.024 53.2 89.024 52.816V51.952C89.024 51.6747 89.0667 51.472 89.152 51.344C89.2374 51.216 89.408 51.0987 89.664 50.992C90.3254 50.6933 91.1627 50.4533 92.176 50.272C93.1894 50.0907 94.1974 50 95.2 50C97.2267 50 98.72 50.4213 99.68 51.264C100.64 52.1067 101.12 53.392 101.12 55.12V66.064C101.12 66.4907 100.907 66.704 100.48 66.704H99.104C98.6987 66.704 98.464 66.5013 98.4 66.096L98.24 65.04C97.472 65.7013 96.624 66.2133 95.696 66.576C94.768 66.9387 93.8454 67.12 92.928 67.12ZM93.696 64.72C94.4 64.72 95.136 64.5813 95.904 64.304C96.672 64.0267 97.408 63.6213 98.112 63.088V59.824C96.96 59.5467 95.8294 59.408 94.72 59.408C92.3094 59.408 91.104 60.336 91.104 62.192C91.104 63.0027 91.328 63.6267 91.776 64.064C92.224 64.5013 92.864 64.72 93.696 64.72Z" fill="#434343" />
                        <path d="M109.376 66.704C109.056 66.704 108.827 66.6453 108.688 66.528C108.549 66.4106 108.416 66.1706 108.288 65.808L103.552 51.664C103.424 51.28 103.36 51.0346 103.36 50.928C103.36 50.6293 103.52 50.48 103.84 50.48H105.664C106.005 50.48 106.245 50.5386 106.384 50.656C106.523 50.7733 106.645 51.0133 106.752 51.376L110.24 63.472L113.44 51.376C113.547 51.0133 113.675 50.7733 113.824 50.656C113.973 50.5386 114.208 50.48 114.528 50.48H116C116.32 50.48 116.555 50.5386 116.704 50.656C116.853 50.7733 116.981 51.0133 117.088 51.376L120.32 63.632L123.904 51.376C124.011 51.0133 124.133 50.7733 124.272 50.656C124.411 50.5386 124.651 50.48 124.992 50.48H126.72C127.04 50.48 127.2 50.6293 127.2 50.928C127.2 51.0346 127.136 51.28 127.008 51.664L122.144 65.808C122.016 66.1706 121.883 66.4106 121.744 66.528C121.605 66.6453 121.376 66.704 121.056 66.704H119.488C119.168 66.704 118.933 66.64 118.784 66.512C118.635 66.384 118.507 66.1386 118.4 65.776L115.2 54L112.032 65.776C111.925 66.1386 111.797 66.384 111.648 66.512C111.499 66.64 111.264 66.704 110.944 66.704H109.376Z" fill="#434343" />
                        <path d="M134.304 67.184C132.512 67.184 130.901 66.8853 129.472 66.288C129.216 66.1813 129.04 66.064 128.944 65.936C128.848 65.808 128.8 65.6053 128.8 65.328V64.432C128.8 64.048 128.928 63.856 129.184 63.856C129.333 63.856 129.6 63.92 129.984 64.048C131.392 64.496 132.853 64.72 134.368 64.72C135.413 64.72 136.208 64.5173 136.752 64.112C137.296 63.7067 137.568 63.12 137.568 62.352C137.568 61.84 137.402 61.424 137.072 61.104C136.741 60.784 136.138 60.464 135.264 60.144L132.544 59.12C130.176 58.2453 128.992 56.752 128.992 54.64C128.992 53.2533 129.53 52.1333 130.608 51.28C131.685 50.4267 133.098 50 134.848 50C136.234 50 137.589 50.2453 138.912 50.736C139.168 50.8213 139.349 50.9333 139.456 51.072C139.562 51.2107 139.616 51.4187 139.616 51.696V52.56C139.616 52.944 139.477 53.136 139.2 53.136C139.05 53.136 138.805 53.0827 138.464 52.976C137.333 52.6347 136.181 52.464 135.008 52.464C132.96 52.464 131.936 53.1573 131.936 54.544C131.936 55.0987 132.106 55.536 132.448 55.856C132.789 56.176 133.461 56.528 134.464 56.912L136.96 57.872C138.218 58.3627 139.125 58.944 139.68 59.616C140.234 60.288 140.512 61.1573 140.512 62.224C140.512 63.7387 139.946 64.944 138.816 65.84C137.685 66.736 136.181 67.184 134.304 67.184Z" fill="#434343" />
                        <path d="M140.689 69.7057C138.634 69.7353 136.209 70.2008 134.374 71.5092C133.807 71.9248 133.905 72.4797 134.53 72.4006C136.62 72.1431 141.224 71.5883 142.045 72.658C142.865 73.7076 141.129 78.1269 140.347 80.0895C140.113 80.6826 140.62 80.9221 141.147 80.466C144.582 77.5335 145.481 71.4099 144.778 70.518C144.427 70.0827 142.743 69.6756 140.689 69.7057ZM83.4583 70.7089C83.0007 70.7669 82.7933 71.3268 83.2766 71.7693C91.4263 79.2195 102.214 83.7041 114.187 83.7041C122.73 83.7041 132.666 80.9894 139.504 75.8749C140.626 75.0309 139.65 73.7481 138.506 74.273C130.838 77.5577 122.501 79.1575 114.915 79.1575C103.67 79.1575 92.7977 76.0213 83.9841 70.8419C83.7916 70.7264 83.6109 70.6899 83.4583 70.7089Z" fill="white" />
                    </motion.g>
                </motion.g>
                {/* GCP */}
                <motion.g variants={cardVariants.gcp} transition={animationTransition}>
                    <path d="M0.404176 29.0703C-0.923549 20.8931 4.62903 13.1879 12.8062 11.8601L71.0435 2.40418C79.2207 1.07645 86.926 6.62903 88.2537 14.8062L100.755 91.7979C102.083 99.9751 96.5299 107.68 88.3527 109.008L30.1154 118.464C21.9383 119.792 14.233 114.239 12.9053 106.062L0.404176 29.0703Z" fill="white" />
                    <motion.g variants={iconVariants.gcp} transition={animationTransition}>
                        <path d="M38.0007 70.9447C38.7786 71.1517 39.6013 71.2496 40.3978 71.1204L51.6633 69.2912L53.1184 78.2529L41.8567 80.0815L41.8523 80.0783C38.6561 80.581 35.3834 80.0297 32.5288 78.5073L32.5285 78.5054L32.5328 78.5076L38.0007 70.9447Z" fill="#34A853" />
                        <path d="M37.1299 50.968C34.0884 51.4748 31.2807 52.9173 29.0977 55.0946C26.9147 57.2719 25.4652 60.0756 24.9509 63.1152C24.4468 66.1514 24.907 69.2691 26.2669 72.03C27.6269 74.791 29.8183 77.0564 32.5328 78.5076L38.0068 70.9382C36.8168 70.6236 35.7617 69.9299 35.0016 68.962C34.2414 67.994 33.8175 66.8047 33.7941 65.5743C33.7707 64.3438 34.1492 63.1392 34.872 62.1431C35.5949 61.1469 36.6228 60.4134 37.8001 60.0538C38.9761 59.6856 40.2398 59.7079 41.4021 60.1175C42.5644 60.527 43.5628 61.3018 44.248 62.3258L49.7256 54.7772C48.0599 53.2164 46.0566 52.0608 43.8714 51.4002C41.6863 50.7397 39.3815 50.5914 37.1299 50.968Z" fill="#FBBC05" />
                        <path d="M40.6924 38.5911C43.8445 37.0727 47.3296 36.3752 50.8234 36.5623C54.3169 36.7495 57.7066 37.8154 60.678 39.6616L62.0574 40.9059L56.3787 47.1467L55.3885 46.9889C50.1567 44.0158 43.4555 45.6918 40.1572 50.7165C40.1446 50.7356 40.1297 50.7543 40.1161 50.7746C39.1203 50.7383 38.1199 50.8024 37.1299 50.968C34.153 51.4641 31.4011 52.8573 29.2387 54.9577C29.2386 54.9501 29.2368 54.942 29.2377 54.9332C29.6075 51.4626 30.8526 48.1424 32.8562 45.2842C34.8597 42.4261 37.5558 40.1229 40.6924 38.5911Z" fill="#EA4335" />
                        <path d="M60.6871 39.6704C64.0559 41.7923 66.7309 44.8526 68.3832 48.4746L68.3793 48.4752C71.2626 49.7928 73.6428 52.0071 75.1643 54.7877C76.6858 57.5685 77.2671 60.7673 76.8219 63.9056C76.3652 67.0498 74.9102 69.9647 72.671 72.2193C70.4316 74.4739 67.5265 75.9494 64.3849 76.4279L53.1299 78.2554L51.9772 78.2546L50.5708 69.5926L51.6742 69.2898L62.9308 67.4729C66.0409 66.968 68.1568 64.0497 67.6558 60.9645C67.1538 57.8725 64.2239 55.7776 61.1139 56.2826L60.9326 55.1663C60.6886 53.4689 60.0615 51.8492 59.0981 50.4304C58.139 49.018 56.8716 47.8417 55.3923 46.9896L56.3787 47.1467L62.0574 40.9059L60.6871 39.6704Z" fill="#4285F4" />
                    </motion.g>
                </motion.g>
            </motion.g>

            <defs>
                <linearGradient id="paint0_linear_2496_555" x1="160.659" y1="3.99934" x2="196.019" y2="118.99" gradientUnits="userSpaceOnUse"><stop stopColor="#3CCBF4" /><stop offset="1" stopColor="#2892DF" /></linearGradient>
                <linearGradient id="paint1_linear_2496_555" x1="176.927" y1="37.3717" x2="157.552" y2="75.4427" gradientUnits="userSpaceOnUse"><stop stopColor="#114A8B" /><stop offset="1" stopColor="#0669BC" /></linearGradient>
            </defs>
        </svg>
    );
}

// --- The Interactive Card Wrapper ---
const InteractiveCloudCard = ({ cardVariants, iconVariants }: { cardVariants: any; iconVariants: any }) => {
    return (
        <motion.div
            initial="collapsed"
            animate="collapsed"
            whileHover="expanded"
            className="w-[236px] h-[123px] flex justify-center items-center cursor-pointer"
        >
            <CloudSelectorAnimation cardVariants={cardVariants} iconVariants={iconVariants} />
        </motion.div>
    );
};

// --- Reusable Slider UI ---
const SliderControl = ({ label, value, setValue, min, max, step = 1 }: { label: string; value: number; setValue: (val: number) => void; min: number; max: number; step?: number }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-400">{label}</label>
            <span className="px-2 py-0.5 bg-slate-700 text-slate-200 text-xs font-mono rounded">{value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400"
        />
    </div>
);

const ControlPanel = ({ name, values, onValueChange }: { name: string; values: any; onValueChange: (state: string, prop: string, value: number) => void }) => (
    <div className="p-4 space-y-4 rounded-xl bg-slate-800/70 border border-slate-700/50 shadow-lg">
        <h4 className="text-lg font-bold text-white flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span>
            {name}
        </h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
                <h5 className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase border-b border-slate-700 pb-1">Collapsed</h5>
                <SliderControl label="X Position" value={values.collapsed.x} setValue={(v) => onValueChange('collapsed', 'x', v)} min={-200} max={200} />
                <SliderControl label="Y Position" value={values.collapsed.y} setValue={(v) => onValueChange('collapsed', 'y', v)} min={-100} max={100} />
                <SliderControl label="Rotation" value={values.collapsed.rotate} setValue={(v) => onValueChange('collapsed', 'rotate', v)} min={-180} max={180} step={0.1} />
                <SliderControl label="Scale" value={values.collapsed.scale} setValue={(v) => onValueChange('collapsed', 'scale', v)} min={0.1} max={2} step={0.01} />
            </div>
            <div className="space-y-4">
                <h5 className="text-[10px] font-bold tracking-widest text-teal-400 uppercase border-b border-slate-700 pb-1">Expanded</h5>
                <SliderControl label="X Position" value={values.expanded.x} setValue={(v) => onValueChange('expanded', 'x', v)} min={-200} max={200} />
                <SliderControl label="Y Position" value={values.expanded.y} setValue={(v) => onValueChange('expanded', 'y', v)} min={-100} max={100} />
                <SliderControl label="Rotation" value={values.expanded.rotate} setValue={(v) => onValueChange('expanded', 'rotate', v)} min={-180} max={180} step={0.1} />
                <SliderControl label="Scale" value={values.expanded.scale} setValue={(v) => onValueChange('expanded', 'scale', v)} min={0.1} max={2} step={0.01} />
            </div>
        </div>
    </div>
);


// --- Main Application ---
const AnimationTuner = () => {
    // Starting with your provided "perfected" values
    const [cardParams, setCardParams] = useState({
        gcp: {
            collapsed: { x: 44, y: 2, rotate: -12.5, scale: 0.95 },
            expanded: { x: 5, y: 1, rotate: -2, scale: 1 },
        },
        aws: {
            collapsed: { x: 2, y: -7, rotate: 0.4, scale: 0.95 },
            expanded: { x: 8, y: 0, rotate: 0, scale: 1 },
        },
        azure: {
            collapsed: { x: -40, y: 1, rotate: 11.4, scale: 0.95 },
            expanded: { x: 1, y: 2, rotate: -0.4, scale: 1 },
        },
    });

    const [iconParams, setIconParams] = useState({
        gcp: {
            collapsed: { x: -6, y: 2, rotate: 7.3, scale: 1 },
            expanded: { x: 0, y: 0, rotate: 0, scale: 1 },
        },
        aws: {
            collapsed: { x: 3, y: -4, rotate: 0.2, scale: 0.95 },
            expanded: { x: 0, y: 0, rotate: 0, scale: 1 },
        },
        azure: {
            collapsed: { x: 14, y: 0, rotate: -7.5, scale: 1.05 },
            expanded: { x: 0, y: 0, rotate: 0, scale: 1 },
        },
    });

    const [copied, setCopied] = useState(false);

    const handleCardValueChange = (card: string, state: string, prop: string, value: number) => {
        setCardParams((prev: any) => ({
            ...prev,
            [card]: { ...prev[card], [state]: { ...prev[card][state], [prop]: value } }
        }));
    };

    const handleIconValueChange = (icon: string, state: string, prop: string, value: number) => {
        setIconParams((prev: any) => ({
            ...prev,
            [icon]: { ...prev[icon], [state]: { ...prev[icon][state], [prop]: value } }
        }));
    };

    const codeToCopy = `// Final Card Animation Variants
const cardAnimationVariants = ${JSON.stringify(cardParams, null, 2)};

// Final Icon Animation Variants
const iconAnimationVariants = ${JSON.stringify(iconParams, null, 2)};`;

    const handleCopy = () => {
        const textarea = document.createElement('textarea');
        textarea.value = codeToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden md:flex-row">
            {/* CONTROLS PANEL */}
            <div className="w-full md:w-[480px] p-6 space-y-8 bg-slate-900 border-r border-slate-800 overflow-y-auto custom-scrollbar">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Animation Tuner</h2>
                    <p className="text-slate-400 text-sm mt-1">Refine transitions for cards and icons separately.</p>
                </div>

                <section className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <span className="flex-1 h-px bg-slate-800 mr-4"></span>
                        Card Tuning
                        <span className="flex-1 h-px bg-slate-800 ml-4"></span>
                    </h3>
                    <ControlPanel name="GCP Card" values={cardParams.gcp} onValueChange={(state, prop, value) => handleCardValueChange('gcp', state, prop, value)} />
                    <ControlPanel name="AWS Card" values={cardParams.aws} onValueChange={(state, prop, value) => handleCardValueChange('aws', state, prop, value)} />
                    <ControlPanel name="Azure Card" values={cardParams.azure} onValueChange={(state, prop, value) => handleCardValueChange('azure', state, prop, value)} />
                </section>

                <section className="space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center">
                        <span className="flex-1 h-px bg-slate-800 mr-4"></span>
                        Icon Tuning
                        <span className="flex-1 h-px bg-slate-800 ml-4"></span>
                    </h3>
                    <ControlPanel name="GCP Icon" values={iconParams.gcp} onValueChange={(state, prop, value) => handleIconValueChange('gcp', state, prop, value)} />
                    <ControlPanel name="AWS Icon" values={iconParams.aws} onValueChange={(state, prop, value) => handleIconValueChange('aws', state, prop, value)} />
                    <ControlPanel name="Azure Icon" values={iconParams.azure} onValueChange={(state, prop, value) => handleIconValueChange('azure', state, prop, value)} />
                </section>
            </div>

            {/* PREVIEW & OUTPUT PANEL */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#020617]">
                <div
                    className="flex-1 flex items-center justify-center p-12 relative"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}
                >
                    <div className="absolute top-6 left-6 flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                        <span>Live Preview (Hover to expand)</span>
                    </div>

                    <div className="scale-150 transform">
                        <InteractiveCloudCard cardVariants={cardParams} iconVariants={iconParams} />
                    </div>
                </div>

                {/* CODE GENERATOR AREA */}
                <div className="p-6 bg-slate-900/50 border-t border-slate-800 backdrop-blur-xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="p-2 rounded-lg bg-slate-800 mr-3">
                                    <CodeIcon />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Generated Variants</h3>
                                    <p className="text-[10px] text-slate-500 uppercase font-medium tracking-tight">Copy-paste into your project</p>
                                </div>
                            </div>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center px-4 py-2 text-xs font-bold transition-all rounded-lg active:scale-95 ${copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                                    }`}
                            >
                                <CopyIcon copied={copied} />
                                <span className="ml-2">{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
                            </button>
                        </div>
                        <div className="relative group">
                            <pre className="w-full p-5 overflow-x-auto text-[13px] leading-relaxed rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-cyan-400 max-h-48 custom-scrollbar">
                                <code>{codeToCopy}</code>
                            </pre>
                            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-950/80 to-transparent pointer-events-none rounded-r-xl group-hover:opacity-0 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
            `}} />
        </div>
    );
};

export default AnimationTuner;