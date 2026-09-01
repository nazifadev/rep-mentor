const calculateAngle = (a, b, c) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * (180 / Math.PI))
    if (angle > 180) angle = 360 - angle
    return angle
}

export const getLungeFeedback = (landmarks, phaseRef, repCountRef, repCooldownRef, setRepCount, playRepSound, validRepRef) => {
    const leftHip = landmarks[23]
    const leftKnee = landmarks[25]
    const leftAnkle = landmarks[27]
    const rightHip = landmarks[24]
    const rightKnee = landmarks[26]
    const rightAnkle = landmarks[28]

    const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle)
    const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle)

    const minAngle = Math.min(leftKneeAngle, rightKneeAngle)

    let feedback = ""

    if (phaseRef.current === "up") {
        if (Date.now() - repCooldownRef.current < 2000) {
            feedback = ""
        } else if (minAngle > 150) {
            feedback = "lunge deeper"
        } else if (minAngle <= 150 && minAngle > 120) {
            feedback = "getting there, keep going"
        } else if (minAngle <= 120 && minAngle >= 70) {
            phaseRef.current = "down"
            validRepRef.current = true
            feedback = "perfect depth"
        } else if (minAngle < 70) {
            phaseRef.current = "down"
            feedback = "too low!"
        }
    } else if (phaseRef.current === "down") {
        if (minAngle < 70) {
            feedback = "too low!"
        } else if (minAngle >= 150) {
            window.speechSynthesis.cancel()
            phaseRef.current = "up"
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