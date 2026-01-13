import java.util.Objects;

public class Pair<K, V> {

    private final K key;
    private final V value;

    // Constructor
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    // Returns the key
    public K getKey() {
        return key;
    }

    // Returns the value
    public V getValue() {
        return value;
    }

    // Returns a new Pair with swapped values
    public Pair<V, K> swap() {
        return new Pair<>(value, key);
    }

    // equals(): compares key and value
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Pair<?, ?>)) return false;

        Pair<?, ?> other = (Pair<?, ?>) obj;
        return Objects.equals(key, other.key)
            && Objects.equals(value, other.value);
    }

    // hashCode(): consistent with equals()
    @Override
    public int hashCode() {
        return Objects.hash(key, value);
    }

    // toString(): string representation
    @Override
    public String toString() {
        return "Pair[" + key + ", " + value + "]";
    }
    public static void main(String[] args) {
        Pair<String, Integer> pair = new Pair<>("age", 25);

        System.out.println(pair.getKey());      // age
        System.out.println(pair.getValue());    // 25
        System.out.println(pair.swap());        // Pair[25, age]

        Pair<String, Integer> pair2 = new Pair<>("age", 25);
        System.out.println(pair.equals(pair2)); // true
    }
}
