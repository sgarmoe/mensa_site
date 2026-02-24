

export default function TeamAvatar ({ avatarId, teamName = 'Team', size = 35}) {

    const getAvatarUrl = (id) =>  {
        if (!id) return "https://sleepercdn.com";
        if (id.startsWith('http')) return id;
        return `https://sleepercdn.com/avatars/thumbs/${id}`;
    };

    const handleImageError = (e) => {
        e.target.src = "https://sleepercdn.com";
        e.target.onerror = null;
    };

    return (
        <Box
            component="img"
            src={getAvatarUrl(avatarId)}
            alt={`${teamName} avatar`}
            onError={handleImageError}
            sx={{
                width: size,
                height: size,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid',
                borderColor: 'divider'
            }}
        />
    );
}