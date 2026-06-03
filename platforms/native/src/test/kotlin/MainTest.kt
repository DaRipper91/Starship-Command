import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.assertTextEquals
import org.junit.Rule
import org.junit.Test

class ExampleTest {
    @get:Rule
    val rule = createComposeRule()

    @Test
    fun titleIsDisplayed(){
        rule.setContent {
            App()
        }

        rule.onNodeWithTag("title").assertIsDisplayed()
        rule.onNodeWithTag("title").assertTextEquals("Star Command Desktop")
    }
}
