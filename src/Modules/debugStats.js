export function debugStats(target, property, descriptor) {

    if (descriptor.value) {
        const original = descriptor.value.bind(target);
        // const originalValue = descriptor.value;

        descriptor.value = (...args) => {

            // can't access class property.
            const val = original(...args);

            return val;
        }
    }
    if (descriptor.get) {
        const originalGet = descriptor.get.bind(target);
        descriptor.get = () => {
            const val = originalGet();
            return val;
        }
    }
    if (descriptor.set) {
        const originalSet = descriptor.set.bind(target);
        descriptor.set = (val) => {
            const r = originalSet(val);
            return r;
        }
    }
    return descriptor;
}