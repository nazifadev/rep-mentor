const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * (180 / Math.PI))
    if (angle > 180) angle = 360 - angle
    return angle
}

export const getSquatFeedback = (landmarks, squatPhaseRef, repCountRef, repCooldownRef, setRepCount, playRepSound, validRepRef) => {
    const leftHip = landmarks[23]
    const leftKnee = landmarks[25]
    const leftAnkle = landmarks[27]
    const rightHip = landmarks[24]
    const rightKnee = landmarks[26]
    const rightAnkle = landmarks[28]

    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle)
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle)

    const avgAngle = (leftKneeAngle + rightKneeAngle) / 2

    let feedback = ""

    if (squatPhaseRef.current === "up") {
        if (Date.now() - repCooldownRef.current < 2000) {
            feedback = ""
        } else if (avgAngle > 150) {
            feedback = "squat deeper"
        } else if (avgAngle <= 150 && avgAngle > 120) {
            feedback = "getting there, keep going"
        } else if (avgAngle <= 120 && avgAngle >= 100) {
            squatPhaseRef.current = "down"
            validRepRef.current = true
            feedback = "perfect depth, come back up or hold"
        } else if (avgAngle < 100) {
            squatPhaseRef.current = "down"
            feedback = "too low! that's not a squat"
        }
    } else if (squatPhaseRef.current === "down") {
        if (avgAngle < 100) {
            feedback = "too low! that's not a squat"
        } else if (avgAngle >= 150) {
            window.speechSynthesis.cancel()
            squatPhaseRef.current = "up"
            if (validRepRef.current) {
                repCountRef.current += 1
                setRepCount(repCountRef.current)
                playRepSound()
            }
            validRepRef.current = false
            repCooldownRef.current = Date.now()
            feedback = ""
        } else {
            feedback = ""
        }
    }

    return feedback
}