package org.dss.tennislog.repositories;

import org.dss.tennislog.domain.Player;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Iterator;
import java.util.Optional;

import static org.hamcrest.CoreMatchers.equalTo;

@TestPropertySource(locations = "classpath:application-test.properties")
@RunWith(SpringRunner.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class PlayerRepositoryTest {

    @Autowired
    private PlayerRepository playerRepository;

    @Test
    public void getByIdTest() {
        Optional<Player> player = playerRepository.getById(1L);
        if (!player.isPresent()) Assert.fail();
        String findName = player.get().getUsername();
//        System.out.println(findName);
        Assert.assertThat("Username of player must be protasov1", findName, equalTo("protasov1"));
    }

    @Test
    public void findByUsernameTest() {
        Optional<Player> player = playerRepository.findByUsername("protasov1");
        if (!player.isPresent()) Assert.fail();
        Long findId = player.get().getId();
//        System.out.println(findId);
        Assert.assertThat("Id of player with username protasov1 must be 1", findId, equalTo(1L));
    }

    @Test
    public void findAllByOrderByLastName() {
        Iterable<Player> allPlayers = playerRepository.findAllByOrderByLastName();
        Assert.assertThat("It must be 10 matches found.",
                allPlayers.spliterator().getExactSizeIfKnown(), equalTo(10L));
        Iterator<Player> iterator = allPlayers.iterator();
        Player lastPlayer = new Player();
        while (iterator.hasNext()) {
            lastPlayer = iterator.next();
        }
        Assert.assertThat("Last player must have id 1",
                lastPlayer.getId(), equalTo(1L));

    }
}