package br.com.meratan.forensic;

import br.com.meratan.note.NoteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forensic")

public class ForensicController {

    private final NoteRepository notes;
    
    public ForensicController(NoteRepository notes) {
        this.notes = notes;
    }

    @DeleteMapping
    @Transactional
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteALLinBatch() {
        notes.deleteAllInBatch();
    }
    
}
