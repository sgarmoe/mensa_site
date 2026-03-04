import Avatar from '@mui/material/Avatar';

export default function TeamAvatar({ avatarId, teamName = 'Team', size = 35 }) {
    const getAvatarUrl = (id) => {
        if (!id) return null;
        if (id.startsWith('http')) return id;
        return `https://sleepercdn.com/avatars/thumbs/${id}`;
    };

    const handleImageError = (e) => {
        e.currentTarget.src = '';
        e.currentTarget.onerror = null;
    };

    return (
        <Avatar
            alt={`${teamName} avatar`}
            src={getAvatarUrl(avatarId)}
            imgProps={{ onError: handleImageError }}
            sx={{ width: size, height: size }}
        />
    );
}