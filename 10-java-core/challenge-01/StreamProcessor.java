import java.util.*;

public class StreamProcessor {
    public static OptionalDouble averageOfEvens(List<Integer> numbers) {
        return numbers.stream()
                      .filter(n -> n % 2 == 0)
                      .mapToInt(Integer::intValue)
                      .average();
    }
    
    public static void main(String[] args) {
        System.out.println(averageOfEvens(Arrays.asList(1, 2, 3, 4, 5, 6))); // Returns: OptionalDouble[4.0]
        System.out.println(averageOfEvens(Arrays.asList(1, 3, 5)));          // Returns: OptionalDouble.empty
    }
}