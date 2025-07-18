float easeOut(float x, float t) {
    return 1.0 - pow(1.0 - x, t);
}

float easeIn(float x, float t) {
    return 1.0 - pow(1.0 - x, t);
}
