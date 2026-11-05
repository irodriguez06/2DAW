const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export default formatDuration;
